import React, { Suspense } from "react";
import OrderCard from "./OrderCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import qs from "qs";

async function getOrders(
  customerId: string,
  dateFrom: string,
  dateTo: string,
) {
  const token = cookies().get("payload-token");

  if (!token) {
    redirect("/login");
  }

  function getWeekAgoDate() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toLocaleDateString();
  }
  try {
    const dateQuery = {
      or: [
        dateFrom?.length > 0
          ? {
            and: [
              {
                status: {
                  not_equals: "template",
                },
              },
              {
                start_end_date:
                  dateTo?.length > 0
                    ? {
                      greater_than_equal: dateFrom,
                      less_than_equal: dateTo,
                    }
                    : {
                      greater_than_equal: dateFrom,
                    },
              },
            ],
          }
          : {
            or: [
              {
                start_end_date: {
                  less_than_equal: getWeekAgoDate(),
                },
              },
              {
                status: {
                  equals: "ended",
                },
              },
            ],
          },
        {
          status: {
            equals: "template",
          },
        },
      ],
    };

    const customerQuery = {
      customer: {
        equals: customerId,
      },
    };

    const query =
      customerId?.length > 0 ? { and: [dateQuery, customerQuery] } : dateQuery;

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      {
        addQueryPrefix: true,
      }
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders${stringifiedQuery}&sort=start_end_date`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.value}`,
        },
      }
    ).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
}

export default async function OrderHistoryComponent({
  customerId,
  dateFrom,
  dateTo,
}: {
  customerId: string;
  dateFrom: string;
  dateTo: string;
}) {
  const orders = await getOrders(customerId, dateFrom, dateTo);

  function getRecurringDates(start: string, end: string, days: any) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      const dayName = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(day).toLowerCase();
      if (days[dayName]) {
        dates.push(new Date(day));
      }
    }
    return dates;
  }

  const oneWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000; // One week ago in milliseconds

  // Generate recurring dates for template orders and flatten the array
  const allOrders = orders.docs.flatMap((order: Order, index: number) => {
    if (order.status === "template") {
      const dates = getRecurringDates(order.start_date, order.end_date, {
        monday: order.monday,
        tuesday: order.tuesday,
        wednesday: order.wednesday,
        thrursday: order.thrursday,
        friday: order.friday,
        saturday: order.saturday,
        sunday: order.sunday,
      }).filter((date) => date.getTime() <= oneWeekAgo); // Only include dates older than one week
      return dates.map((date) => ({
        ...order,
        start_end_date: date.toLocaleDateString(),
      }));
    } else {
      return order;
    }
  });

  const filteredOrders = allOrders.filter((order: Order) => {
    const orderDate = new Date(order.start_end_date).getTime();
    const fromDate = dateFrom ? new Date(dateFrom).getTime() : null;
    const toDate = dateTo ? new Date(dateTo).getTime() : null;
    return (
      (!fromDate || orderDate >= fromDate) &&
      (!toDate || orderDate <= toDate) &&
      (orderDate <= oneWeekAgo || order.status === "ended")
    );
  });

  // Sort the orders by date and estimated_start hour
  filteredOrders.sort((a: Order, b: Order) => {
    const dateDiff =
      new Date(a.start_end_date).getTime() -
      new Date(b.start_end_date).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    } else {
      return (
        new Date(a.estimated_start).getHours() -
        new Date(b.estimated_start).getHours()
      );
    }
  });

  function formatDate(dateString: string | Date, status?: string) {
    if (status) {
      if (status === 'template') {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}. ${month}. ${year}`;
      } else {
        const date = new Date(dateString);
        const day = date.getDate() + 1; // V produkcii je to o jeden den viac
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}. ${month}. ${year}`;
      }
    } else {
      const date = new Date(dateString);
      const day = date.getDate() + 1; // V produkcii je to o jeden den viac
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day}. ${month}. ${year}`;
    }
  }

  function formatHour(dateString: string) {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minutes}`;
  }

  return (
    <div className="mt-5 mb-16">
      {orders.errors &&
        orders.errors.map((error: any, index: number) => (
          <div key={index} className="flex items-center justify-center">
            <h1 className="mt-20 text-xl font-medium">
              {error.message === "You are not allowed to perform this action."
                ? "Žiadne objednávky..."
                : error.message}
            </h1>
          </div>
        ))}
      {dateFrom?.length > 1 && (
        <h1 className="text-2xl mt-16 mb-5 font-medium">
          Od {formatDate(dateFrom)}{" "}
          {dateTo?.length > 1 && `do ${formatDate(dateTo)}`}
        </h1>
      )}

      {orders && orders?.docs?.length < 1 && (
        <div className="w-full h-full flex justify-center">
          <h1 className="text-xl mt-24 font-medium">Žiadne objednávky...</h1>
        </div>
      )}

      <div className="mt-10">
        {orders &&
          filteredOrders &&
          filteredOrders.map((order: Order, index: number) => (
            <div key={order.id} className="">
              <OrderCard
                customer={order.customer}
                id={order.id}
                date={formatDate(order.start_end_date, order.status)}
                status={order.status}
                startTime={formatHour(order.estimated_start)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

import React from 'react'
import OrderCard from './OrderCard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import qs from 'qs'

async function getOrders(customerId: string, dateFrom: string, dateTo: string) {
    const token = cookies().get("payload-token")

    if (!token) {
        redirect("/login")
    }

    function getWeekAgoDate() {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date.toISOString();
    }

    if (dateFrom?.length > 0) dateFrom = new Date(new Date(dateFrom).getTime() - 86399000).toISOString() // dateFrom - (1d - 1s)

    const dateQuery = dateFrom?.length > 0 ? dateTo?.length > 0 ? {
        and: [
            {
                start_end_date: {
                    greater_than_equal: dateFrom
                }
            },
            {
                start_end_date: {
                    less_than_equal: dateTo
                }
            }
        ]
    } : {
        start_end_date: {
            greater_than_equal: dateFrom
        }
    } : {};

    const customerQuery = {
        customer: {
            equals: customerId
        }
    }

    const weekOldQuery = {
        start_end_date: {
            greater_than_equal: getWeekAgoDate()
        }
    }

    const query = dateFrom?.length > 0 ?
        (customerId?.length > 0 ? {
            and: [dateQuery, customerQuery]
        } : dateQuery)
        : customerId?.length > 0 ? customerQuery : weekOldQuery;

    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true,
        }
    )
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders${stringifiedQuery}&sort=start_end_date`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token.value}`,
        },
        cache: "no-store",
    }).then(res => res.json())

    return res
}

export default async function OrderComponent({ customerId, dateFrom, dateTo }: { customerId: string, dateFrom: string, dateTo: string }) {


    const orders = await getOrders(customerId, dateFrom, dateTo)

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}. ${month}. ${year}`;
    }

    function formatHour(dateString: string) {
        const date = new Date(dateString);
        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minutes}`;
    }

    return (
        <div className="mt-5 mb-16">
            {orders.errors && orders.errors.map((error: any, index: number) => (
                <div key={index} className='flex items-center justify-center'>
                    <h1 className='mt-20 text-xl font-semibold'>{error.message === "You are not allowed to perform this action." ? "Žiadne objednávky..." : error.message}</h1>
                </div>
            ))}
            {dateFrom?.length > 0 && dateTo?.length > 0 && (
                <h1 className='text-2xl mt-16 mb-5 font-semibold'>Od {formatDate(dateFrom)} do {formatDate(dateTo)}</h1>
            )}

            {orders && orders?.docs?.length < 1 && (
                <div className='w-full h-full flex justify-center'>
                    <h1 className='text-xl mt-24 font-semibold'>Žiadne objednávky...</h1>
                </div>
            )}

            {orders && orders?.docs && orders.docs.map((order: Order, index: number) => (
                <div key={order.id} className=''>
                    <div>
                        <h3 className="text-xl mt-1 pl-3">{formatHour(order.estimated_start)}</h3>
                    </div>
                    <OrderCard id={order.id} title={`Objednávka ${index + 1}`} date={formatDate(order.start_end_date)} status={`Stav: ${order.status}`} />
                </div>
            ))}
        </div>
    )
}

import React from 'react'
import OrderCard from './OrderCard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import qs from "qs";


async function getOrders(customerId: string) {


    const token = cookies().get("payload-token")

    if (!token) {
        redirect("/login")
    }

    const query = {
        "customer.id": {
            equals: customerId,
        },
    };

    // console.log(customerId)
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true,
        }
    );


    const res = await fetch(`
    ${customerId.length > 0 ? `${process.env.PAYLOAD_CMS_URL}/api/orders?where[customer][equals]=${customerId}&sort=-estimated_start`
            : `${process.env.PAYLOAD_CMS_URL}/api/orders?sort=-estimated_start`
        }
    `, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token.value}`,
        },
    }).then(res => res.json())

    return res
}

export default async function OrderComponent({ cutomerId }: { cutomerId: string }) {

    const orders = await getOrders(cutomerId)

    console.log(orders)


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
        <div className="mt-5 mb-11">
            {orders.errors && orders.errors.map((error: any, index: number) => (
                <p key={index}>{error.message}</p>
            ))}


            {orders.docs && orders.docs.map((order: Order, index: number) => (
                <div key={order.id}>
                    <div>
                        <h3 className="text-xl mt-1 pl-3">{formatHour(order.estimated_start)}</h3>
                    </div>
                    <OrderCard id={order.id} title={`Objednávka ${index + 1}`} date={formatDate(order.start_end_date)} status={`Stav: ${order.status}`} />
                </div>
            ))}
        </div>
    )
}

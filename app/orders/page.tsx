import LogOutButton from "@/components/common/LogOutButton";
import { cookies } from "next/headers";
import Image from 'next/image';

async function getOrders() {
    const token = cookies().get("payload-token")?.value
    console.log(token)

    const res = await fetch("https://adamdemian1-gmailcom-goldlux-payloadcms.payloadcms.app/api/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`
        },
        credentials: "include",
        next: {
            revalidate: 0,
        },
        cache: "no-cache",
    }).then(res => res.json())

    console.log(res)

    return res
}

export default async function Orders() {

    const orders = await getOrders()

    // zatial placeholder
    let customers = [
        { id: 0, name: "Zakaznik 1", select: true },
        { id: 1, name: "Zakaznik 2", select: false },
        { id: 2, name: "Zakaznik 3", select: false },
        { id: 3, name: "Zakaznik 4", select: false },
    ]

    // console.log(orders.docs);

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
        <div className="px-3">

            <div className="flex flex-row justify-around">
                {customers.map(customer => (
                    <button className="mx-1 flex flex-col" key={customer.id}>
                        <Image
                            className="self-center"
                            src={"/customer" + (customer.select ? "_select" : "") + ".svg"}
                            alt={customer.select ? "Selected Customer" : "Customer"}
                            width="36"
                            height="36"
                        />
                        <p className={`text-xs text-[${customer.select ? "#FF2D55" : "#575757"}]`}>{customer.name}</p>
                    </button>
                ))}
            </div>

            <h1 className="mt-5 text-2xl font-bold">Od 17.6 do 26.6</h1>

            <div className="mt-5">
                {orders.docs && orders.docs.map((order: any, index: number) => (
                    <div key={order.id}>
                        <div>
                            <h3 className="text-xl mt-1 pl-3">{formatHour(order.estimated_start)}</h3>
                        </div>
                        <div className="border rounded-xl w-full px-3 my-5">
                            <h3 className="text-lg font-bold mt-1">Objednávka {index + 1}</h3>
                            <p className="text-lg font-bold">{formatDate(order.estimated_start)}</p>
                            <p className="text-lg font-bold mb-1">Stav: {order.status}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-16">
                {/* @ts-expect-error Server Component */}
                <LogOutButton />
            </div>
        </div>
    )
}

import LogOutButton from "@/components/common/LogOutButton";
import { cookies } from "next/headers";
import Image from 'next/image';
import { redirect } from "next/navigation";
import OpenFilter from "@/components/orders/OpenFilter";
import OrderCard from "@/components/orders/OrderCard";
import { LogOut } from "lucide-react";
import { getUser } from "@/utils/getOrder";

type Customer = {
    id: string
    firstName: string
    lastName: string
    role: string
    email: string
}

type Order = {
    id: string
    status: string
    start_end_date: string
    estimated_start: string
    estimated_end: string
    estimated_duration: number
    real_start?: string
    real_end?: string
    real_duration?: number
    manual_price?: number
    customer: Customer
}

async function getOrders() {
    const token = cookies().get("payload-token")

    if (!token) {
        redirect("/login")
    }

    const res = await fetch(`${process.env.PAYLOAD_CMS_URL}/api/orders?sort=-estimated_start`, {
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

async function getCustomers() {
    const token = cookies().get("payload-token")

    if (!token) {
        redirect("/login")
    }

    const res = await fetch(`${process.env.PAYLOAD_CMS_URL}/api/users?where[role][equals]=customer`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token.value}`,
        },
        cache: "no-store",
    }).then(res => res.json())

    return res.docs
}

export default async function Orders() {

    const orders = await getOrders()
    const { user } = await getUser()
    const customers = await getCustomers()



    console.log(customers);

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
        <div>
            <div className="my-10 w-full relative">
                <OpenFilter />
                <div className="flex justify-center items-center w-full">
                    <h1 className="text-black/50 text-md font-bold">Aktuálne</h1>
                </div>
                <LogOutButton />
            </div>
            <div className="px-3">

                <div className="flex flex-row justify-around">
                    {(user.role === 'admin' || user.role === 'cleaner') && customers.map((customer: Customer) => (
                        <button className="mx-1 flex flex-col" key={customer.id}>
                            <Image
                                className="self-center"
                                src={"/customer.svg"}
                                alt={"Customer"}
                                width="36"
                                height="36"
                            />
                            <p className={`text-xs text-["#575757"]`}>{customer.firstName} {customer.lastName}</p>
                        </button>
                    ))}
                </div>

                <h1 className="mt-5 text-2xl font-bold">Od 17.6 do 26.6</h1>

                <div className="mt-5 mb-11">
                    {orders.errors && orders.errors.map((error: any, index: number) => (
                        <p key={index}>{error.message}</p>
                    ))}


                    {orders.docs && orders.docs.map((order: any, index: number) => (
                        <div key={order.id}>
                            <div>
                                <h3 className="text-xl mt-1 pl-3">{formatHour(order.estimated_start)}</h3>
                            </div>
                            <OrderCard id={order.id} title={`Objednávka ${index + 1}`} date={formatDate(order.start_end_date)} status={`Stav: ${order.status}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

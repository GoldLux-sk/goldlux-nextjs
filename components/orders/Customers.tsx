import { getUser } from "@/utils/getUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CustomerButton from "./CustomerButton";

async function getCustomers() {
    const token = cookies().get("payload-token")

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/users?where[role][equals]=customer`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token?.value}`,
        },
        cache: "no-store",
    }).then(res => res.json())

    return res.docs
}

export default async function Customers() {
    const { user } = await getUser()
    const customers = await getCustomers()

    return (
        <div className="flex flex-row justify-start overflow-x-auto whitespace-nowrap p-2">
            {user && (user?.role === 'admin' || user?.role === 'cleaner') && customers.map((customer: Customer) => (
                <CustomerButton key={customer.id} customer={customer} />
            ))}
        </div>
    )
}


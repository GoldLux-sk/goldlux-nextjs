import LogOutButton from "@/components/common/LogOutButton";
import { cookies } from "next/headers";

async function getOrders() {
    const token = cookies().get("payload-token")?.value
    console.log(token)

    const res = await fetch("http://localhost:3000/api/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`
        },
        credentials: "include",
    }).then(res => res.json())

    console.log(res)

    return res
}

export default async function Orders() {

    const orders = await getOrders()

    console.log(orders)


    return (
        <div>
            {/* @ts-expect-error Server Component */}
            <LogOutButton />

            {JSON.stringify(orders)}
        </div>
    )
}

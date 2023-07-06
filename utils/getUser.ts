import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUser() {
    const token = cookies().get("payload-token")

    if (!token) {
        redirect("/login")
    }

    const res = await fetch(`https://goldlux-payloadcms.payloadcms.app/api/users/me`, {
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
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function LogOutButton() {

    async function logOut() {
        'use server'
        // @ts-ignore
        cookies().set("payload-token", null)

        redirect("/")
    }

    return (
        <form action={logOut}>
            <button type="submit" className="text-lg border-2 rounded-xl px-5 h-10">Log out</button>
        </form>
    )
}

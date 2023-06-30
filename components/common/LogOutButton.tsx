"use client"

import { useRouter } from "next/navigation";

export default async function LogOutButton() {

    const router = useRouter();

    const onSubmit = async () => {

        try {
            const res = await fetch(`http://localhost:3000/api/users/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json())

            console.log(res)
        } catch (error) {
            console.log(error)
        }

        router.push("/login")
    }

    return (
        <form onSubmit={onSubmit}>
            <button type="submit" className="text-lg border-2 rounded-xl px-5 h-10">Log out</button>
        </form>
    )
}

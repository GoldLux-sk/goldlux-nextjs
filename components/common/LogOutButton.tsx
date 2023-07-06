"use client"

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {

    const router = useRouter();

    const onSubmit = async () => {
        try {
            const res = await fetch(`https://goldlux-payloadcms.payloadcms.app/api/users/logout`, {
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
        <LogOut onClick={onSubmit} className="cursor-pointer absolute right-5 top-5 w-6 h-6" />
    )
}

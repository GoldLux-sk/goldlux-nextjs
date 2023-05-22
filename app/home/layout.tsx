import getSession from "@/utils/session"
import { redirect } from "next/navigation"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    /*const session = getSession()

    if (!session.isLoggedIn) {
        redirect("/")
    }*/

    return (

        <div>
            {children}
        </div>
    )
}

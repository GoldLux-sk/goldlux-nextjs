import getSession from "@/utils/session"
import Navbar from "@/components/orders/Navbar";
import { redirect } from "next/navigation"

export default function OrdersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const session = getSession()

    // if (!session.isLoggedIn) {
    //     redirect("/")
    // }

    return (

        <div>
            {children}
            <Navbar/>
        </div>
    )
}

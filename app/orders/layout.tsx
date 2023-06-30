import getSession from "@/utils/session"
import { LayoutGrid, ListChecks } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function OrdersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = getSession()

    if (!session.isLoggedIn) {
        redirect("/")
    }

    return (

        <div>
            {children}
            <nav className="flex bg-white fixed bottom-0 w-full">
                <Link href="/orders" className="pb-6 w-1/2 border border-b-0 border-r-0 pb-3 pt-2 flex justify-center">
                    <LayoutGrid className="w-7 h-7 text-black" />
                </Link>
                <Link href="/orders/history" className="pb-6 w-1/2 border border-b-0 pb-3 pt-2 flex justify-center">
                    <ListChecks className="w-7 h-7 text-black" />
                </Link>
            </nav>
        </div>
    )
}

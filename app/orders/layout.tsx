import getSession from "@/utils/session"
import { LayoutGrid, ListChecks, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function OrderLayout({
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
            <div className="my-10 w-full relative">
                <SlidersHorizontal className="w-6 h-6 text-black absolute left-4" />
                <div className="flex justify-center items-center w-full">
                    <h1 className="text-black/50 text-md font-bold">Aktuálne</h1>
                </div>
            </div>
            {children}
            <nav className="flex fixed bottom-3 w-full">
                <Link href="/orders" className="w-1/2 border border-b-0 border-r-0 pb-3 pt-2 flex justify-center">
                    <LayoutGrid className="w-7 h-7 text-black" />
                </Link>
                <Link href="/orders/history" className="w-1/2 border border-b-0 pb-3 pt-2 flex justify-center">
                    <ListChecks className="w-7 h-7 text-black" />
                </Link>
            </nav>
        </div>
    )
}

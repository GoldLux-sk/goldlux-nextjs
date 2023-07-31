'use client'
import Image from "next/image";
import { usePathname, useSearchParams } from 'next/navigation'
import Link from "next/link"


export default function OrderNavbar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function hrefParams() {
        const params = { 'customer': searchParams.get("customer"), 'from': searchParams.get("from"), 'to': searchParams.get("to") }
        let s = '';
        for(const [key, value] of Object.entries(params)) {
            if(value && value.length > 0) s = s.concat(`${s.length > 0 ? '&' : '?'}${key}=${value}`);
        }
        return s;
    }

    return (
        <nav className="flex bg-white fixed bottom-0 w-full">
            <Link href={`/orders${hrefParams()}`} className="pb-6 w-1/2 border border-b-0 border-r-0 pt-2 flex justify-center">
            <Image
                src={"/home" + (pathname === '/orders' ? "_select" : "") + ".svg"}
                alt="Home"
                width="34"
                height="34"
            />
            </Link>
            <Link href={`/orders/history${hrefParams()}`} className="pb-6 w-1/2 border border-b-0 pt-2 flex justify-center">
            <Image
                src={"/history" + (pathname === '/orders/history' ? "_select" : "") + ".svg"}
                alt="History"
                width="34"
                height="34"
            />
            </Link>
        </nav>
    )
}
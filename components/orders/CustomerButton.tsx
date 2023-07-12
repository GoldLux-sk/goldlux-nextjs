"use client"
import Image from "next/image"
import { useCustomerState } from "./context/CustomerStateContext"
import { usePathname, useSearchParams } from 'next/navigation'
import Link from "next/link"
import { toast } from "react-hot-toast"

export default function CustomerButton({ customer }: { customer: Customer }) {
    const { selected, setSelected } = useCustomerState()
    const searchParams = useSearchParams();
    const pathname = usePathname();

    if (searchParams.get("customer") === customer.id) setSelected(customer.id);
    else if (selected === customer.id) setSelected("");

    function handleSelect() {
        if (selected === customer.id) {
            setSelected("")
            toast.success(`Zobrazené objednávky pre všetkých zákazníkov`)
        } else {
            setSelected(customer.id)
            toast.success(`Zobrazené objednávky pre ${customer.firstName} ${customer.lastName}`)
        }
    }

    function textColor(): string {
        return selected === customer.id ? "text-[#FF2D55]" : "text-[#575757]";
    }

    function hrefParams(customerSel: boolean) {
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        return `${customerSel ? '' : `?customer=${customer.id}`}${from ? `${customerSel ? '?' : '&'}from=${from}` : ''}${from && to ? `&to=${to}` : ''}`;
    }

    return (
        <Link key={customer.id} href={`${pathname}/${hrefParams(selected === customer.id)}`}>
            <button onClick={handleSelect} className="mx-1 flex flex-col" >
                <Image
                    className="self-center"
                    src={"/customer" + (selected === customer.id ? "_select" : "") + ".svg"}
                    alt={selected === customer.id ? "Selected Customer" : "Customer"}
                    width="36"
                    height="36"
                />
                <p className={`text-xs ${textColor()}`}>{customer.firstName} {customer.lastName}</p>
            </button>
        </Link>
    )
}

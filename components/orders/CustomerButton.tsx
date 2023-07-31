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
        const params = { 'customer': customerSel ? null : customer.id, 'from': searchParams.get("from"), 'to': searchParams.get("to") }
        let s = '';
        for(const [key, value] of Object.entries(params)) {
            if(value && value.length > 0) s = s.concat(`${s.length > 0 ? '&' : '?'}${key}=${value}`);
        }
        return s;
    }

    return (
        <Link key={customer.id} href={`${pathname}/${hrefParams(selected === customer.id)}`}>
            <button onClick={handleSelect} className="flex px-3 flex-col p-2" >
                <Image
                    className="self-center"
                    src={"/customer" + (selected === customer.id ? "_select" : "") + ".svg"}
                    alt={selected === customer.id ? "Selected Customer" : "Customer"}
                    width="36"
                    height="36"
                />
                <p className={`text-xs italic ${textColor()}`}>{customer.firstName} {customer.lastName}</p>
            </button>
        </Link>
    )
}

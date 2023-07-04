"use client"
import Image from "next/image"
import { useCustomerState } from "./context/CustomerStateContext"
import Link from "next/link"
import { toast } from "react-hot-toast"

export default function CustomerButton({ customer }: { customer: Customer }) {
    const { selected, setSelected } = useCustomerState()

    function handleSelect() {
        if (selected === customer.id) {
            setSelected("")
            toast.success(`Zobrazené objednávky pre všetkých zákazníkov`)
        } else {
            setSelected(customer.id)
            toast.success(`Zobrazené objednávky pre ${customer.firstName} ${customer.lastName}`)
        }
    }

    return (
        <Link key={customer.id} href={selected === customer.id ? `/orders` : `/orders?customer=${customer.id}`}>
            <button onClick={handleSelect} className="mx-1 flex flex-col" >
                <Image
                    className="self-center"
                    src={"/customer" + (selected === customer.id ? "_select" : "") + ".svg"}
                    alt={selected === customer.id ? "Selected Customer" : "Customer"}
                    width="36"
                    height="36"
                />
                <p className={`text-xs text-[${selected === customer.id ? "#FF2D55" : "#575757"}]`}>{customer.firstName} {customer.lastName}</p>
            </button>
        </Link>
    )
}

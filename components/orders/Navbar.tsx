'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderNavbar({ orderId }: { orderId: string }) {
    const router = useRouter();
    return (
        <div className="relative flex flex-row justify-center p-3 mt-6">
            <button className="cursor-pointer absolute left-4" type="button" onClick={() => router.push('/orders')} >
                <Image src="/back.svg" alt="Back" width="24" height="24" />
            </button>
            <h1 className="text-black/50 text-md font-bold">{`Objednávka: ${orderId}`}</h1>
        </div>
    )
}
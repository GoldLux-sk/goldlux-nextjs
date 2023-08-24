'use client'
import { ArrowLeftCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderNavbar({ status }: { status: string }) {
    const router = useRouter();
    return (
        <div className="relative flex items-center flex-row start px-6 mt-10 gap-3">
            <button className="cursor-pointer" type="button" onClick={() => router.back()} >
                <ArrowLeftCircleIcon className="h-9 w-9 stroke-1 hover:text-gray-700 transition-all" />
            </button>
            <div>
                <p
                    className={`text-lg capitalize ml-3 py-1 px-2 rounded-lg ${status === "ended"
                        ? "bg-red-600/20 text-red-700"
                        : status === "started"
                            ? "bg-blue-600/20 text-blue-700"
                            : status === "canceled"
                                ? "bg-black/20 text-black"
                                : "bg-green-600/20 text-green-700"
                        }}`}
                >
                    {status}
                </p>
            </div>
        </div>
    )
}
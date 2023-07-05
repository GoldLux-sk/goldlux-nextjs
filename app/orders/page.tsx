import LogOutButton from "@/components/common/LogOutButton";
import OpenFilter from "@/components/orders/OpenFilter";
import Customers from "@/components/orders/Customers";
import { CustomerStateProvider, useCustomerState } from "@/components/orders/context/CustomerStateContext";
import OrderComponent from "@/components/orders/OrderComponent";
import { Toaster } from "react-hot-toast";

type Props = {
    searchParams?: {
        customer?: string
        from?: string
        to?: string
    }
}

export default async function Orders({ searchParams }: Props) {

    const customerId = searchParams?.customer || ""

    const { from, to } = searchParams || {}

    return (
        <CustomerStateProvider>
            <Toaster />
            <div className="my-10 w-full relative">
                <OpenFilter />
                <div className="flex justify-center items-center w-full">
                    <h1 className="text-black/50 text-md font-bold">Aktuálne</h1>
                </div>
                <LogOutButton />
            </div>
            <div className="px-3">
                {/* @ts-expect-error Server Component */}
                <Customers />
                {/* @ts-expect-error Server Component */}
                <OrderComponent customerId={customerId} dateFrom={from} dateTo={to} />
            </div>
        </CustomerStateProvider>
    )
}

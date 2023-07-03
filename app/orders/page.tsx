import LogOutButton from "@/components/common/LogOutButton";
import OpenFilter from "@/components/orders/OpenFilter";
import Customers from "@/components/orders/Customers";
import { CustomerStateProvider, useCustomerState } from "@/components/orders/context/CustomerStateContext";
import OrderComponent from "@/components/orders/OrderComponent";

type Props = {
    searchParams?: {
        customer?: string
    }
}

export default async function Orders({ searchParams }: Props) {

    const cutomerId = searchParams?.customer || ""

    return (
        <CustomerStateProvider>
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
                <OrderComponent cutomerId={cutomerId} />
            </div>
        </CustomerStateProvider>
    )
}

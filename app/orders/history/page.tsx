import LogOutButton from "@/components/common/LogOutButton";
import OpenFilter from "@/components/orders/OpenFilter";
import Customers from "@/components/orders/Customers";
import { CustomerStateProvider } from "@/components/orders/context/CustomerStateContext";
import { Toaster } from "react-hot-toast";
import OrderHistoryComponent from "@/components/orders/OrderHistoryComponent";

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
      <div className="mt-10 mb-5 pb-3 w-full relative border border-x-0 border-t-0 border-stone-300">
        <OpenFilter />
        <div className="flex justify-center items-center w-full">
          <h1 className="text-black/50 text-md font-bold">História</h1>
        </div>
        <LogOutButton />
      </div>
      <div className="px-3">
        {/* @ts-expect-error Server Component */}
        <Customers />
        {/* @ts-expect-error Server Component */}
        <OrderHistoryComponent customerId={customerId} dateFrom={from} dateTo={to} />
      </div>
    </CustomerStateProvider>
  )
}

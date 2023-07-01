import CalendarDate from "@/components/orders/CalendarDate"
import DetailsGrid from "@/components/orders/DetailsGrid"
import OrderNavbar from "@/components/orders/Navbar"
import { ModalStateProvider } from "@/components/orders/context/ModalStateContext"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Timer from "@/components/orders/Timer";
import CancelSubmit from "@/components/orders/CancelSubmit";

type Order = {
  id: string
  status: string
  start_end_date: string
  estimated_start: string
  estimated_end: string
  estimated_duration: number
  real_start?: string
  real_end?: string
  real_duration?: number
  manual_price?: number
}

async function getOrder(id: string) {
  const token = cookies().get("payload-token")

  if (!token) {
    redirect("/login")
  }

  const order = await fetch(`${process.env.PAYLOAD_CMS_URL}/api/orders/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token.value}`,
    },
  }).then(res => res.json())

  return order
}
export default async function Order({ params }: {
  params: { id: string }
}) {

  const order: Order = await getOrder(params.id)

  console.log(order)

  return (
    <div className="overflow-hidden">
      <ModalStateProvider>
        <OrderNavbar orderId={order.id} />
        <CalendarDate startEndDate={order.start_end_date} />
        <DetailsGrid order={order} />
        <Timer id={params.id} />
        <CancelSubmit id={params.id} />
      </ModalStateProvider>
    </div>
  )

}
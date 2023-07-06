import CalendarDate from "@/components/orders/CalendarDate"
import DetailsGrid from "@/components/orders/DetailsGrid"
import OrderNavbar from "@/components/orders/Navbar"
import { ModalStateProvider } from "@/components/orders/context/ModalStateContext"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Timer from "@/components/orders/Timer";
import CancelSubmit from "@/components/orders/CancelSubmit";
import { getUser } from "@/utils/getUser"

async function getOrder(id: string) {
  const token = cookies().get("payload-token")

  if (!token) {
    redirect("/login")
  }

  const order = await fetch(`https://goldlux-payloadcms.payloadcms.app/api/orders/${id}`, {
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

  const { user } = await getUser()
  const order: Order = await getOrder(params.id)

  return (
    <div className="overflow-hidden">
      <ModalStateProvider>
        <OrderNavbar orderId={order.id} />
        <CalendarDate startEndDate={order.start_end_date} />
        <DetailsGrid order={order} />
        {
          (user?.role === "admin" || user?.role === "cleaner") &&
          <Timer id={params.id} />
        }
        {
          (user?.role === "admin" || user?.role === "cleaner") &&
          <CancelSubmit id={params.id} />
        }
      </ModalStateProvider>
    </div>
  )

}
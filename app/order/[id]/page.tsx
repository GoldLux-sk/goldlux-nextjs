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

  const order = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token.value}`,
    },
    cache: "no-store",
  }).then(res => res.json())

  return order
}
export default async function Order({ params }: {
  params: { id: string }
}) {

  const { user } = await getUser()
  const order: Order = await getOrder(params.id)

  const token = cookies().get("payload-token")

  return (
    <div className="overflow-hidden">
      <ModalStateProvider>
        <OrderNavbar orderId={order.id} />
        <CalendarDate startEndDate={order.start_end_date} />
        <DetailsGrid order={order} />
        <Timer id={params.id} token={token?.value} role={user?.role} status={order.status} />
        {
          (user?.role === "admin" || user?.role === "cleaner") && order.status !== "cancelled" && order.status !== "ended" &&
          <CancelSubmit id={params.id} token={token?.value} />
        }
      </ModalStateProvider>
    </div>
  )

}
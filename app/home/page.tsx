import LogOutButton from "@/components/common/LogOutButton";
import OrderCard from "@/components/orders/OrderCard";

export default function Home() {

    const placeholderOrders = [
        { id: 1, title: "Order 1", date: '5.11.2023', status: 'planned' },
        { id: 2, title: "Order 2", date: '6.11.2023', status: 'planned' },
        { id: 3, title: "Order 3", date: '8.11.2023', status: 'planned' },
    ]

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-center mt-10">
                <h1 className="text-lg font-semibold opacity-50">Aktuálne</h1>
            </div>
            <div className="mt-[20vh]">
                <ul>
                    {placeholderOrders.map(order => (
                        <li key={order.id}><OrderCard title={order.title} date={order.date} status={order.status} id={""} /></li>
                    ))}
                </ul>

            </div>

        </div>
    )
}

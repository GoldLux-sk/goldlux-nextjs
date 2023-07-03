import OrderComponent from "./OrderComponent"

export default function OrderWrapper() {
    return (
        <div>
            <h1 className="mt-5 text-2xl font-bold">Od 17.6 do 26.6</h1>
            {/* @ts-expect-error Server Component */}
            <OrderComponent />
        </div>
    )
}

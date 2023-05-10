import LogOutButton from "@/components/common/LogOutButton";

async function getOrders() {
    const res = await fetch("https://adamdemian1-gmailcom-goldlux-payloadcms.payloadcms.app/api/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res.json())

    console.log(res)

    return res
}

export default function Orders() {

    const orders = getOrders()

    console.log(orders)


    return (
        <div>
            {/* @ts-expect-error Server Component */}
            <LogOutButton />
        </div>
    )
}

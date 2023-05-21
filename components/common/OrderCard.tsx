import {FunctionComponent} from "react";

type OrderCardProps = {
    title: string,
    date: string,
    status: string
}

const OrderCard: FunctionComponent<OrderCardProps> = ({
    title, date, status
}) => {
    return (
        <div className="block w-[90vw] px-5 py-3 my-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h5>
            <p className="font-bold text-gray-900 dark:text-gray-400">{date}</p>
            <p className="font-bold text-gray-900 dark:text-gray-400">Stav: {status}</p>
        </div>
    )
}

export default OrderCard;
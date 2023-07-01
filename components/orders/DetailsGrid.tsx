import React from "react";

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

type DetailsGridProps = {
    order: Order;
};

const DetailsGrid: React.FC<DetailsGridProps> = ({ order }) => {

    function formatTime(dateString: string | undefined) {
        const date = new Date(dateString || '');
        const hours = date.getHours();
        const minutes = date.getMinutes();

        if (isNaN(hours) || isNaN(minutes)) {
            return '-- : --';
        }

        // padStart will add a leading 0 if hours/minutes is only 1 digit, e.g. "9" will be "09"
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    const timeStyle = "p-1 bg-gray-100 rounded-md justify-center inline-flex";

    return (
      <div className="mt-5 mx-8 grid grid-cols-4 gap-4">
        <div className="col-span-2 font-semibold">Stav:</div>
        <div className="col-span-2 pl-2">{order.status}</div>

        <div className="col-span-2 font-semibold">Odhadovaný čas:</div>
        <div className={timeStyle}>{formatTime(order.estimated_start)}</div>
        <div className={timeStyle}>{formatTime(order.estimated_end)}</div>

        <div className="col-span-2 font-semibold">Reálny čas:</div>
        <div className={timeStyle}>{formatTime(order.real_start)}</div>
        <div className={timeStyle}>{formatTime(order.real_end)}</div>

        <div className="col-span-2 font-semibold">Hodinovka:</div>
        <div className="col-span-2 font-semibold pl-2">{order.manual_price || '?'}$/h</div>
        {/* Add more fields as necessary */}
      </div>
    );
};

export default DetailsGrid;

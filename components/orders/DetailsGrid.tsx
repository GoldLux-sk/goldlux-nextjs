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


    return (
        <div className="w-full mx-10 mt-5 justify-center grid grid-cols-2 gap-4 p-2">
            <div>Odhadovany cas:</div>
            <div className="flex gap-5">
                <div>{formatTime(order.estimated_start)}</div>
                <div>{formatTime(order.estimated_end)}</div>
            </div>
            <div>Stav:</div>
            <div>{order.status}</div>
            <div>Real End Time:</div>
            <div className="flex gap-5">
                <div>{formatTime(order.real_start)}</div>
                <div>{formatTime(order.real_end)}</div>
            </div>
            {/* Add more fields as necessary */}
        </div>
    );
};

export default DetailsGrid;

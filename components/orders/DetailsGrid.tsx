import { CalendarDays, CheckCircle, Clock, UserCircle } from "lucide-react";

type DetailsGridProps = {
  order: Order;
};

const DetailsGrid: React.FC<DetailsGridProps> = ({ order }) => {
  function formatTime(dateString: string | undefined) {
    const date = new Date(dateString || "");
    const hours = date.getUTCHours() + 2;
    const minutes = date.getUTCMinutes();

    if (isNaN(hours) || isNaN(minutes)) {
      return "-- : --";
    }

    // padStart will add a leading 0 if hours/minutes is only 1 digit, e.g. "9" will be "09"
    return `${hours.toLocaleString().padStart(2, "0")}:${minutes
      .toLocaleString()
      .padStart(2, "0")}`;
  }

  function formatDate(dateString: string | Date) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Add one day to the date
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();
    return `${day}. ${month}. ${year}`;
  }

  const timeStyle =
    "col-span-2 justify-start inline-flex font-semibold pl-3"; //bg-gray-100

  return (
    <div className="mt-20 mx-7 my-12 grid grid-cols-4 gap-5 items-center justify-between">
      <div className="flex items-center gap-2 col-span-2 font-medium">
        <UserCircle className="w-7 h-7 stroke-1" />
        Zakaznik
      </div>
      <div className="col-span-2 pl-3 font-semibold">
        {order.customer.firstName} {order.customer.lastName}
      </div>
      <div className="flex items-center gap-2 col-span-2 font-medium">
        <CalendarDays className="w-7 h-7 stroke-1" />
        Dátum
      </div>
      <div className="col-span-2 pl-3 font-semibold">
        {formatDate(order.estimated_start.toLocaleString())}
      </div>

      <div className="flex items-center gap-2 col-span-2 w-full font-medium">
        <Clock className="w-7 h-7 stroke-1" />
        Čas:
      </div>
      <div className={timeStyle}>
        {formatTime(order.estimated_start.toLocaleString())} - {' '}
        {formatTime(order.estimated_end.toLocaleString())}
      </div>

      {order.status !== "template" && (
        <>
          <div className="flex items-center gap-2 col-span-2 w-full font-medium">
            <CheckCircle className="w-7 h-7 stroke-1" />
            Reálny čas:
          </div>
          <div className={timeStyle}>
            {order.status === "cancelled"
              ? "-- : --"
              : formatTime(
                order.real_start && order.real_start.toLocaleString()
              )} - {' '}
            {order.status === "cancelled"
              ? "-- : --"
              : formatTime(order.real_end && order.real_end.toLocaleString())}
          </div>
          <div className={timeStyle}>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsGrid;

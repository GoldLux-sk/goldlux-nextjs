import { CalendarDays, CheckCircle, Clock, EuroIcon, UserCircle } from "lucide-react";

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

  function formatDate(dateString: string | Date, status?: string) {
    if (status) {
      if (status === 'template') {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}. ${month}. ${year}`;
      } else {
        const date = new Date(dateString);
        const day = date.getDate() + 1; // V produkcii je to o jeden den viac
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}. ${month}. ${year}`;
      }
    } else {
      const date = new Date(dateString);
      const day = date.getDate() + 1; // V produkcii je to o jeden den viac
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day}. ${month}. ${year}`;
    }
  }

  const timeStyle =
    "col-span-2 justify-start inline-flex font-medium pl-3"; //bg-gray-100

  return (
    <div className="mt-20 mx-7 my-12 grid grid-cols-4 gap-5 items-center justify-between border border-gray-300 px-4 py-4 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2 col-span-2 font-normal">
        <UserCircle className="w-7 h-7 stroke-1" />
        Zakaznik:
      </div>
      <div className="col-span-2 pl-3 font-medium">
        {order.customer.firstName} {order.customer.lastName}
      </div>
      <div className="flex items-center gap-2 col-span-2 font-normal">
        <CalendarDays className="w-7 h-7 stroke-1" />
        Dátum:
      </div>
      <div className="col-span-2 pl-3 font-medium">
        {order.status === "template" ? (
          <div>
            od{formatDate(order.start_date.toLocaleString(), order.status)}
            <div>
              do {formatDate(order.end_date.toLocaleString(), order.status)}
            </div>
          </div>
        ) : (
          <div>
            {formatDate(order.start_end_date.toLocaleString())}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 col-span-2 w-full font-normal">
        <Clock className="w-7 h-7 stroke-1" />
        Čas:
      </div>
      <div className={timeStyle}>
        {formatTime(order.estimated_start.toLocaleString())} - {' '}
        {formatTime(order.estimated_end.toLocaleString())}
      </div>

      {order.status !== "template" && (
        <>
          <div className="flex items-center gap-2 col-span-2 w-full font-normal">
            <CheckCircle className="w-7 h-7 stroke-1" />
            Reálny čas:
          </div>
          <div className={timeStyle}>
            {order.status === "cancelled"
              ? "-- : --"
              : formatTime(
                order.real_start && order.real_start.toLocaleString()
              )} <strong className="px-1">|</strong> {' '}
            {order.status === "cancelled"
              ? "-- : --"
              : formatTime(order.real_end && order.real_end.toLocaleString())}
          </div>
        </>
      )}
      {order.status === 'ended' && (
        <>
          {order.manual_price && (
            <>
              <div className="flex items-center gap-2 col-span-2 w-full font-normal">
                <EuroIcon className="w-7 h-7 stroke-1" />
                <p className="col-span-2 justify-start inline-flex font-normal">Cena:</p>
              </div>
              <div className="col-span-2 pl-3 font-medium underline underline-offset-2">
                {order.manual_price.toFixed(2)}€
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsGrid;

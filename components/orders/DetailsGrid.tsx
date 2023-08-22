type DetailsGridProps = {
  order: Order;
};

const DetailsGrid: React.FC<DetailsGridProps> = ({ order }) => {
  function formatTime(dateString: string | undefined) {
    const date = new Date(dateString || "");
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (isNaN(hours) || isNaN(minutes)) {
      return "-- : --";
    }

    // padStart will add a leading 0 if hours/minutes is only 1 digit, e.g. "9" will be "09"
    return `${hours.toLocaleString().padStart(2, "0")}:${minutes
      .toLocaleString()
      .padStart(2, "0")}`;
  }

  const timeStyle =
    "p-1 border border-black rounded-md justify-center inline-flex"; //bg-gray-100

  return (
    <div className="mt-5 mx-10 my-12 grid grid-cols-4 gap-4 items-center">
      <div className="col-span-2 font-semibold">Zákaznik:</div>
      <div className="col-span-2 pl-2 font-medium">
        {order.customer.firstName} {order.customer.lastName}
      </div>
      <div className="col-span-2 font-semibold">Stav:</div>
      <div className="text-xl col-span-2 px-3 py-2 border border-black rounded-lg justify-center inline-flex">
        {order.status}
      </div>

      <div className="col-span-2 font-semibold">Odhadovaný čas:</div>
      <div className={timeStyle}>
        {formatTime(order.estimated_start.toLocaleString())}
      </div>
      <div className={timeStyle}>
        {formatTime(order.estimated_end.toLocaleString())}
      </div>

      {order.status !== "template" && (
        <>
          <div className="col-span-2 font-semibold">Reálny čas:</div>
          <div className={timeStyle}>
            {order.status === "cancelled"
              ? "-- : --"
              : formatTime(
                  order.real_start && order.real_start.toLocaleString()
                )}
          </div>
          <div className={timeStyle}>
            {order.status === "cancelled"
              ? "-- : --"
              : formatTime(order.real_end && order.real_end.toLocaleString())}
          </div>
        </>
      )}

      {/* Idem podla noveho dizajnu ;) */}
      {/* <div className="col-span-2 font-semibold">Hodinovka:</div>
            <div className="col-span-2 font-semibold pl-2">{order.manual_price || '?'}$/h</div> */}
    </div>
  );
};

export default DetailsGrid;

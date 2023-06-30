'use client'

import React, {FunctionComponent} from "react";
import { redirect } from "next/navigation";

type OrderCardProps = {
  id: string,
  title: string,
  date: string,
  status: string
}

const OrderCard: FunctionComponent<OrderCardProps> = ({
  id, title, date, status
}) => {
  return (
    <form action={() => redirect(`/order/${id}`)}>
      <button type="submit">
        <div className="text-left block w-[90vw] px-5 py-3 my-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h5>
          <p className="font-bold text-gray-900 dark:text-gray-400">{date}</p>
          <p className="font-bold text-gray-900 dark:text-gray-400">{status}</p>
        </div>
      </button>
    </form>
  )
}

export default OrderCard;
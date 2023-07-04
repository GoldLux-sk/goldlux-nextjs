'use client'

import React, { FunctionComponent } from "react";
import { redirect } from "next/navigation";

type OrderCardProps = {
  id: string,
  title: string,
  date: string,
  status: string
  order: Order
}

const OrderCard: FunctionComponent<OrderCardProps> = ({
  id, title, date, status, order
}) => {

  return (
    <form action={() => redirect(`/order/${id}`)}>
      <button type="submit">
        <div className="text-left w-[93vw] border rounded-xl px-3 my-5 bg-white shadow hover:bg-gray-100">
          <h3 className="text-lg font-bold mt-1">{title}</h3>
          <p className="text-lg font-bold">{date}</p>
          <p className="text-lg font-bold mb-1">{status}</p>
        </div>
      </button>
    </form>
  )
}

export default OrderCard;
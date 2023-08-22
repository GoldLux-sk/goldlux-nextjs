"use client";

import React, { FunctionComponent } from "react";
import Link from "next/link";
import { ArrowRightCircle, User, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type OrderCardProps = {
  id: string;
  date: string;
  status: string;
  startTime: string;
  customer: Customer;
};

const OrderCard: FunctionComponent<OrderCardProps> = ({
  id,
  date,
  startTime,
  status,
  customer,
}) => {
  return (
    <Link href={`/order/${id}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative text-left w-[93vw] border border-gray-300 shadow-lg rounded-xl py-2 px-5 my-5 bg-white hover:bg-gray-100 duration-150"
      >
        <div className="font-medium flex mb-5">
          <span className="font-medium text-black text-lg">
            OB-{id.slice(20)}
          </span>
          <p
            className={`text-sm capitalize ml-3 py-1 px-2 rounded-lg ${
              status === "ended"
                ? "bg-red-600/20 text-red-700"
                : status === "started"
                ? "bg-blue-600/20 text-blue-700"
                : status === "canceled"
                ? "bg-black/20 text-black"
                : "bg-green-600/20 text-green-700"
            }}`}
          >
            {status}
          </p>
        </div>
        <div className="my-3">
          <p className="text-sm font-medium mt-3 relative flex items-center">
            <span className="text-gray-500">Zákazník:</span>
            <span className="absolute left-32 px-2 py-0.5 font-medium flex">
              <UserCircle2 className="w-5 h-5 mr-2" />
              {customer.firstName + " " + customer.lastName}
            </span>
          </p>
          <p className="text-sm font-medium mt-3 relative flex items-center">
            <span className="text-gray-500">Dátum:</span>
            <span className="absolute left-32 px-2 py-0.5 font-medium">
              {date}
            </span>
          </p>
          <p className="text-sm font-medium mt-3 relative flex items-center">
            <span className="text-gray-500">Začiatok:</span>
            <span className="absolute left-32 px-2 py-0.5">{startTime}</span>
          </p>
        </div>
        <ArrowRightCircle className="absolute right-5 top-1/2 transform -translate-y-1/2" />
      </motion.div>
    </Link>
  );
};

export default OrderCard;

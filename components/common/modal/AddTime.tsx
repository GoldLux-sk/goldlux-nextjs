"use client";

import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
type AddTimeProps = {
  id: string;
  token: string | undefined;
  status: string;
};

const AddTime: FunctionComponent<AddTimeProps> = ({ id, status, token }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log(startDate);
  console.log(endDate);

  return (
    <div className="my-20 w-full">
      <form action="">
        <div className="">
          <div>
            <p>Zaciatok</p>
            <DatePicker
              selected={startDate}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.MM. HH:mm"
              onChange={(date: Date) => setStartDate(date)} //only when value has changed
            />
          </div>
          <div>
            <p>Koniec</p>
            <DatePicker
              selected={endDate}
              showTimeSelect
              dateFormat="dd.MM. HH:mm"
              onChange={(date: Date) => setEndDate(date)} //only when value has changed
            />
          </div>
        </div>

        <button
          className="py-3 px-7 mt-5 rounded-xl bg-black text-white"
          type="submit"
        >
          Update time
        </button>
      </form>
    </div>
  );
};

export default AddTime;

'use client'

import React, { useState } from "react";
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { Calendar, DayValue } from '@amir04lm26/react-modern-calendar-date-picker';
import { useRouter, redirect } from 'next/navigation'
import Image from "next/image";
import {cookies} from "next/headers";

export default function Order({ params }: {
  params: { id: string }
}) {

  const router = useRouter()

  // temp
  const order =  {
    "id": params.id,
    "status":"planned",
    "start_end_date":"2023-06-16T22:00:00.000Z",
    "estimated_start":"2023-06-23T20:30:00.239Z",
    "estimated_end":"2023-06-23T21:00:00.871Z",
    "estimated_duration_h":0.5,
    "real_start":"2023-06-23T20:00:00.331Z",
    "real_end":"2023-06-23T21:00:00.726Z",
    "real_duration_h":1,"manual_price":55,
    "createdAt":"2023-06-23T20:13:09.845Z",
    "updatedAt":"2023-06-23T20:13:09.845Z"
  };

  function dateToObj(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return { year: year, month: month, day: day };
  }

  function formatHour(dateString: string) {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minutes}`;
  }

  const [selectedDay, setSelectedDay] = useState<DayValue>(dateToObj(order.start_end_date));

  return (
    <div className="mx-3 mt-6">
      <div className="flex flex-row justify-between p-3">
        <button type="button" onClick={() => router.back()} >
          <Image src="/back.svg" alt="Back" width="24" height="24"/>
        </button>
        <h1 className="text-black/50 text-md font-bold">{`Objednávka ${params.id}`}</h1>
        <div className="w-6 h-6"/>
      </div>

      <div className="mt-3 px-3 flex flex-col items-center">
        <Calendar
          calendarClassName="responsive-calendar"
          value={selectedDay}
          onChange={setSelectedDay}
          colorPrimary="#FF3B30"
          colorPrimaryLight="#F4CFCD"
        />
      </div>

      <div className="mt-5 mx-5 grid grid-cols-4 gap-4">

        <p className="col-span-2 font-semibold">Odhadovaný čas:</p>
        <div className="p-1 bg-gray-100 rounded-md justify-center items-center inline-flex">
          <p>{formatHour(order.estimated_start)}</p>
        </div>
        <div className="p-1 bg-gray-100 rounded-md justify-center items-center inline-flex">
          <p>{formatHour(order.estimated_end)}</p>
        </div>

        <p className="col-span-2 font-semibold">Reálný čas:</p>
        <div className="p-1 bg-gray-100 rounded-md justify-center items-center inline-flex">
          <p>{formatHour(order.real_start)}</p>
        </div>
        <div className="p-1 bg-gray-100 rounded-md justify-center items-center inline-flex">
          <p>{formatHour(order.real_end)}</p>
        </div>

        <p className="col-span-2 font-semibold">Hodinovka:</p>
        <p className="col-span-2 font-semibold">?$/h</p>

      </div>

    </div>
  )

}
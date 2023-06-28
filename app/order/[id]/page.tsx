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
    id: params.id,
    status: "planned",
    start_end_date: "2023-06-16T22:00:00.000Z",
    estimated_start: "2023-06-23T20:30:00.239Z",
    estimated_end: "2023-06-23T21:00:00.871Z",
    estimated_duration_h: 0.5,
    real_start: "2023-06-23T20:00:00.331Z",
    real_end: "2023-06-23T21:00:00.726Z",
    real_duration_h: 1,
    manual_price: 15,
    createdAt: "2023-06-23T20:13:09.845Z",
    updatedAt: "2023-06-23T20:13:09.845Z"
  };

  function dateToObj(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return { year: year, month: month, day: day };
  }

  function formatHM(dateString: string, utc?: boolean) {
    const date = new Date(dateString);
    const hour = utc ? date.getUTCHours() : date.getHours();
    const minutes = utc ? date.getUTCMinutes() : date.getMinutes();
    if(hour == null || isNaN(hour) || minutes == null || isNaN(minutes)) return '--:--';
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  function formatHMS(dateString: string, utc?: boolean) {
    const date = new Date(dateString);
    const HM = formatHM(dateString, utc);
    const seconds = utc ? date.getUTCSeconds() : date.getSeconds();
    if(HM.includes('-') || seconds == null || isNaN(seconds)) return '--:--:--';
    return `${HM}:${seconds.toString().padStart(2, '0')}`;
  }

  const [selectedDay, setSelectedDay] = useState<DayValue>(dateToObj(order.start_end_date));

  let timerRef = React.createRef()

  let startTime: number = 0;
  let currentTime: number = 0;
  let pausedOnTime: number = 0;
  let diffTime: number = 0;
  let pauseTime: number = 0;
  let totalPauseTime: number = 0;
  let totalTime: number = 0;
  let timer: boolean = false;
  let running: boolean = true;

  function startTimer() {
    if(!timer) {
      startTime = new Date().getTime();
      currentTime = new Date().getTime();
      timer = true;
      running = true;
    }
    else if(!running) running = true;

    console.log("TOTAL: " + totalTime)
    console.log("TOTAL Hours: " + formatHMS(new Date(totalTime).toISOString(), true))
  }

  function pauseTimer() {
    running = false;
    pausedOnTime = new Date().getTime()
  }

  function endTimer() {
    timer = false;
  }

  let t = setInterval(function() {
    if(!timer) return;

    currentTime = new Date().getTime();
    diffTime = currentTime - startTime;

    if(!running) pauseTime = currentTime - pausedOnTime;
    else {
      if(pauseTime != 0) {
        totalPauseTime += pauseTime;
        pauseTime = 0;
      }
      totalTime = diffTime - totalPauseTime;
    }

    console.log("TT: " + totalTime);
    console.log("PT: " + pauseTime);
    console.log(" ");
  }, 1000);

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
          <p>{formatHM(order.estimated_start)}</p>
        </div>
        <div className="p-1 bg-gray-100 rounded-md justify-center items-center inline-flex">
          <p>{formatHM(order.estimated_end)}</p>
        </div>

        <p className="col-span-2 font-semibold">Reálný čas:</p>
        <div className="p-1 bg-gray-100 rounded-md justify-center items-center inline-flex">
          <p>{formatHM(order.real_start)}</p>
        </div>
        <div className="p-1 bg-gray-100 rounded-md justify-center items-center inline-flex">
          <p>{formatHM(order.real_end)}</p>
        </div>

        <p className="col-span-2 font-semibold">Hodinovka:</p>
        <p className="col-span-2 font-semibold pl-2">{order.manual_price}$/h</p>
      </div>

      <div className="mt-3 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center w-[90vw] h-14 bg-gray-100 rounded-2xl border border-neutral-700">
          <p className="w-[166px] h-7 text-black text-[40px] font-normal">{formatHMS(new Date(totalTime).toISOString(), true)}</p>
        </div>
        <button type="button" onClick={() => startTimer()} >
          <Image src="/start.svg" alt="Start" width="113" height="113"/>
        </button>
        <div className="mt-[-6px] grid grid-cols-2 gap-10">
          <button type="button" onClick={() => pauseTimer()} >
            <div className="flex flex-col justify-center items-center w-[132px] h-[63px] bg-white rounded-2xl border border-neutral-800">
              <p className="text-center text-black text-[24px] font-normal">STOP</p>
            </div>
          </button>
          <button type="button" onClick={() => endTimer()} >
            <div className="flex flex-col justify-center items-center w-[132px] h-[63px] bg-white rounded-2xl border border-neutral-800">
              <p className="text-center text-black text-[24px] font-normal">KONIEC</p>
            </div>
          </button>
        </div>
      </div>

    </div>
  )

}
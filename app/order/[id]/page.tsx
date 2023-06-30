'use client'

import React, { useState, useEffect } from "react";
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { Calendar, DayValue } from '@amir04lm26/react-modern-calendar-date-picker';
import { useRouter, redirect } from 'next/navigation'
import Image from "next/image";
import Modal from 'react-modal';
import {cookies} from "next/headers";
import CancelOrder from "@/components/common/modal/CancelOrder";
import AddTime from "@/components/common/modal/AddTime";

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

  const [isAddOpen, setAddOpen] = useState<boolean>(false);
  const [isCancelOpen, setCancelOpen] = useState<boolean>(false);
  Modal.setAppElement('#root');

  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [pausedOnTime, setPausedOnTime] = useState<number>(0);
  const [diffTime, setDiffTime] = useState<number>(0);
  const [pauseTime, setPauseTime] = useState<number>(0);
  const [totalPauseTime, setTotalPauseTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [timer, setTimer] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(true);
  const [resetPause, setResetPause] = useState<boolean>(false);
  const [r2, setR2] = useState<boolean>(false);
  const [addedTime, setAddedTime] = useState<number>(0);
  const [updateAdded, setUpdateAdded] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if(timer) {
      if(reset) {
        setReset(false);
        setR2(false);
        setStartTime(new Date().getTime());
        setCurrentTime(new Date().getTime());
        setPausedOnTime(0);
        setDiffTime(0);
        setPauseTime(0);
        setTotalPauseTime(0);
        setTotalTime(addedTime);
        setRunning(true);
      }
      interval = setInterval(function() {
        setCurrentTime(new Date().getTime());
        setDiffTime(currentTime - startTime);

        if(!running) {
          if(!r2) setR2(true);
          if(resetPause) {
            setPausedOnTime(new Date().getTime());
            setPauseTime(0);
            setResetPause(false);
          }
          else setPauseTime(currentTime - pausedOnTime);
        }
        else {
          if(r2) setR2(false);
          if(pauseTime != 0) {
            if(pauseTime > 0) setTotalPauseTime(totalPauseTime + pauseTime);
            setPauseTime(0);
          } else setTotalTime(diffTime - totalPauseTime + addedTime);
          if(!resetPause) setResetPause(true);
        }
      }, 100);
    } else {
      if(!reset || r2) {
        if(pauseTime != 0) {
          if(pauseTime > 0) setTotalPauseTime(totalPauseTime + pauseTime);
          setPauseTime(0);
        }
        if(!resetPause) setResetPause(true);
        setTotalTime(diffTime - totalPauseTime + addedTime);
        if(reset) setR2(false);
        setReset(true);
      }
      if(!running) setRunning(true);
      if(updateAdded) {
        setUpdateAdded(false);
        setTotalTime(diffTime - totalPauseTime + addedTime);
      }
      // @ts-ignore
      clearInterval(interval);
    }
    /*
    console.log("TT:  " + totalTime);
    console.log("PT:  " + pauseTime);
    console.log("TPT: " + totalPauseTime);
    console.log(" ");
    */
    return () => clearInterval(interval);
  }, [startTime, currentTime, pausedOnTime, diffTime, pauseTime, totalPauseTime, totalTime, timer, running, reset, resetPause, r2, addedTime, updateAdded]);

  function startTimer() {
    if(!timer) setTimer(true);
    if(!running) setRunning(true);
  }
  function pauseTimer() { setRunning(false) }
  function endTimer() { setTimer(false) }

  function bgCol(): string {
    return !running ? 'bg-amber-100' : timer ? 'bg-green-100' : 'bg-gray-100'
  }

  //TODO
  function submitOrder() {
    router.push("/orders");
  }

  // TODO
  function cancelOrder() {
    router.push("/orders");
  }

  //TODO
  function addTime(time: number) {
    setUpdateAdded(true);
    setAddedTime(Math.max(0, Math.min(24*3600*1000, time)));
    setTotalTime(diffTime - totalPauseTime + addedTime);
    console.log(addedTime);
  }

  return (
    <div className="mx-3 mt-6">
      <div className="flex flex-row justify-between p-3">
        <button type="button" onClick={() => router.back()} >
          <Image src="/back.svg" alt="Back" width="24" height="24"/>
        </button>
        <h1 className="text-black/50 text-md font-bold">{`Objednávka ${params.id}`}</h1>
        <div className="w-6 h-6"/>
      </div>

      {!isAddOpen && !isCancelOpen ?
        <div className="mt-3 px-3 flex flex-col items-center">
          <Calendar
            calendarClassName="responsive-calendar"
            value={selectedDay}
            onChange={() => null}
            colorPrimary="#FF3B30"
            colorPrimaryLight="#F4CFCD"
          />
        </div>
        : null
      }

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
        <div className={`flex flex-col items-center w-[90vw] h-14 ${bgCol()} rounded-2xl border border-neutral-700`}>
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

        <button className="mt-8" type="button" onClick={() => setAddOpen(true)}>
          <div className="flex flex-row justify-center items-center gap-2 w-[200px] h-12 bg-white rounded-2xl border border-neutral-800">
            <Image src="/plus.svg" alt="Add" width="28" height="28"/>
            <div className="text-black font-normal">PRIDAŤ HODINY</div>
          </div>
        </button>
        <button className="mt-8" type="button" onClick={() => setCancelOpen(true)}>
          <div className="flex flex-row justify-center items-center gap-2 w-[200px] h-12 bg-white rounded-2xl border border-neutral-800">
            <Image src="/close.svg" alt="Add" width="28" height="28"/>
            <div className=" text-black font-normal">Zrušiť Objednávku</div>
          </div>
        </button>
        <button className="mt-5 mb-10" type="button" onClick={() => submitOrder()}>
          <div className="flex flex-col justify-center items-center w-[132px] h-[63px] bg-white rounded-2xl border border-neutral-800">
            <p className="text-center text-black text-[24px] font-normal">HOTOVO</p>
          </div>
        </button>
      </div>

      <CancelOrder isOpen={isCancelOpen} setOpen={setCancelOpen} id={params.id} cancelOrder={cancelOrder}/>
      <AddTime isOpen={isAddOpen} setOpen={setAddOpen} id={params.id} time={addedTime} addTime={addTime}/>

    </div>
  )

}
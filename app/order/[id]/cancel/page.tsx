'use client'

import React, { useState, useEffect } from "react";
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

  // TODO
  function cancelOrder() {
    router.push("/orders/");
  }

  return (
    <div>
      <h1 className="text-center mt-8 text-black/50 text-md font-bold">{`Objednávka ${params.id}`}</h1>
      <div className="mx-5 h-[90vh] border border-black rounded-2xl relative">
        <div className="flex flex-row justify-between p-3">
          <button type="button" onClick={() => router.push("/order/" + params.id)} >
            <Image src="/close.svg" alt="Close" width="24" height="24"/>
          </button>
          <h1 className="text-black text-md font-bold">Zrušiť objednávku?</h1>
          <div className="w-6 h-6"/>
        </div>
        <hr className="w-full h-px bg-black border-0"/>

        <div className="mt-10 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-5">
            <button type="button" onClick={() => router.push("/order/" + params.id)}>
              <div className="w-[40vw] h-12 px-5 py-[13px] bg-rose-500 rounded-2xl border border-zinc-800 justify-center items-center gap-2.5">
                <div className="text-center text-white text-[17px] font-semibold leading-snug">Naspäť</div>
              </div>
            </button>
            <button type="button" onClick={() => cancelOrder()}>
              <div className="w-full h-12 px-5 py-[13px] bg-rose-500 rounded-2xl border border-zinc-800 justify-center items-center gap-2.5">
                <div className="text-center text-white text-[17px] font-semibold leading-snug">Zrušiť</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}
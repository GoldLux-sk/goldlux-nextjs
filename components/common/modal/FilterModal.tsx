'use client'

import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import Modal from 'react-modal';
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { Calendar, DayValue, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import { useRouter, redirect } from 'next/navigation'
import Link from "next/link";
import { toast } from "react-hot-toast";

type FilterModalProps = {
  isOpen: boolean,
  setOpen: (_: boolean) => void,
  //id: string,
  //cancelOrder: () => void,
}

const FilterModal: FunctionComponent<FilterModalProps> = ({
  isOpen, setOpen, //id, cancelOrder
}) => {

  const [selectedDay, setSelectedDay] = useState<DayRange>({
    from: null,
    to: null
  });

  function convertDate(date: DayValue) {
    const rawDate = `${date?.year}-${date?.month}-${date?.day}`
    return new Date(rawDate).toISOString()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      contentLabel="Cancel Order"
      className="custom-modal"
    >
      <div className="bg-white w-screen">
        <div className="mt-10 mx-5 h-[90vh] border border-black rounded-2xl relative">
          <div className="flex flex-row justify-between p-3">
            <button type="button" onClick={() => setOpen(false)} >
              <Image src="/close.svg" alt="Close" width="24" height="24" />
            </button>
            <h1 className="text-black text-md font-bold">Filtre</h1>
            <div className="w-6 h-6" />
          </div>
          <hr className="w-full h-px bg-black border-0" />

          <div className="mt-10 px-3 flex flex-col items-center">
            <Calendar
              calendarClassName="responsive-calendar"
              value={selectedDay}
              onChange={setSelectedDay}
              colorPrimary="#FF3B30"
              colorPrimaryLight="#F4CFCD"
            />
            {selectedDay.from ? (
              <div className="flex flex-col">
                <Link onClick={() => { toast.success('Filtre boli úspešne nastavené'); setOpen(false); }}
                  className="mt-10 px-6 py-3 bg-rose-500 rounded-2xl border border-zinc-800 text-white font-semibold text-[17px]"
                  href={`/orders?from=${convertDate(selectedDay.from)}${selectedDay.from && selectedDay.to ? `&to=${convertDate(selectedDay.to)}` : ''}`}>
                  Potvrdiť dátum
                </Link>
                <button type="button" onClick={() => setSelectedDay({ from: null, to: null })}
                  className="mt-6 h-12 px-6 py-3 bg-rose-500 rounded-2xl border border-zinc-800 text-white font-semibold text-[17px]">
                  Zrušiť dátum
                </button>
              </div>
            ) : (
              <div className="text-center font-semibold leading-snug">
                <div className="mt-10 w-[247px] h-[17px] text-zinc-800 text-[24px]">Vyberte si dátum</div>
                <div className="mt-5 w-[247px] h-[53px] text-zinc-500 text-[14px]">
                  Pomocou označenia dátumov od do sa vám zobrazia obejdnávky, podľa označených dátumov
                </div>
              </div>
            )
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default FilterModal;
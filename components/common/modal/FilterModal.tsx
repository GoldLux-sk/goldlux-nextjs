'use client'

import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import Modal from 'react-modal';
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { Calendar, DayValue, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import { useRouter, redirect } from 'next/navigation'
import Link from "next/link";

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

  console.log(selectedDay)

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
            <div className="mt-10 w-[247px] h-[17px] text-center text-zinc-800 text-[24px] font-semibold leading-snug">Vyberte si dátum</div>
            <div className="mt-5 w-[247px] h-[53px] text-center text-zinc-500 text-[14px] font-semibold leading-snug">
              Pomocou označenia dátumov od do sa vám zobrazia obejdnávky, podľa označených dátumov
            </div>
            {selectedDay.from && (
              <Link onClick={() => setOpen(false)} className="px-5 py-2 bg-red-600 mt-9 text-white rounded-xl" href={`/orders?${selectedDay.from && selectedDay.to ? `from=${convertDate(selectedDay.from)}&to=${convertDate(selectedDay.to)}` : `from=${convertDate(selectedDay.from)}`}`}>
                Potvrdit datum
              </Link>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default FilterModal;
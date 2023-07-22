'use client'

import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import Modal from 'react-modal';
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { Calendar, DayValue, DayRange } from '@amir04lm26/react-modern-calendar-date-picker';
import { useRouter, redirect, useSearchParams, usePathname } from 'next/navigation'
import Link from "next/link";
import { toast } from "react-hot-toast";

type FilterModalProps = {
  isOpen: boolean,
  setOpen: (_: boolean) => void,
}

const FilterModal: FunctionComponent<FilterModalProps> = ({
  isOpen, setOpen
}) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedDay, setSelectedDay] = useState<DayRange>({
    from: convertDayValue(searchParams.get("from")) || null,
    to: convertDayValue(searchParams.get("to")) || null
  });

  function convertDate(date: DayValue) {
    const rawDate = `${date?.year}-${date?.month}-${date?.day}`
    return new Date(rawDate).toISOString()
  }

  function convertDayValue(date: Date | string | number | null): DayValue {
    if (!date) return null;
    date = new Date(date);
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
    };
  }

  function hrefParams(from?: string, to?: string) {
    const params = { 'customer': searchParams.get("customer"), 'from': from, 'to': to }
    let s = '';
    for(const [key, value] of Object.entries(params)) {
      if(value && value.length > 0) s = s.concat(`${s.length > 0 ? '&' : '?'}${key}=${value}`);
    }
    return s;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      contentLabel="Cancel Order"
      className="custom-modal"
    >
      <div className="bg-white w-screen pt-10">
        <div className="mx-5 h-[90vh] border border-black rounded-2xl relative">
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
                  className="mt-10 px-6 py-3 text-center bg-rose-500 rounded-2xl border border-zinc-800 text-white font-semibold text-[17px]"
                  href={`${pathname}${hrefParams(convertDate(selectedDay.from), selectedDay.to ? convertDate(selectedDay.to) : undefined)}`}>
                  Potvrdiť dátum
                </Link>
                <Link onClick={() => setSelectedDay({ from: null, to: null })}
                  className="mt-6 h-12 px-6 py-3 text-center bg-rose-500 rounded-2xl border border-zinc-800 text-white font-semibold text-[17px]"
                  href={`${pathname}${hrefParams()}`}>
                  Zrušiť dátum
                </Link>
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
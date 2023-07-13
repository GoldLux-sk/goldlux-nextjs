'use client'

import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import Modal from 'react-modal';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type AddTimeProps = {
  isOpen: boolean,
  id: string,
  time: number,
  token: string | undefined
  setOpen: (open: boolean) => void,
  addTime: (time: number) => void,
  setTotalTime: (time: number) => void
  setStartTime: (time: number) => void
}

const AddTime: FunctionComponent<AddTimeProps> = ({
  isOpen, setOpen, id, time, addTime, setTotalTime, token, setStartTime
}) => {

  const [seconds, setSeconds] = useState<number>(new Date(time).getUTCSeconds());
  const [minutes, setMinutes] = useState<number>(new Date(time).getUTCMinutes());
  const [hours, setHours] = useState<number>(new Date(time).getUTCHours());

  const router = useRouter();

  const updateSeconds = (seconds: number) => {
    let secs = seconds;
    let mins = 0;
    while (secs >= 60) {
      if (hours >= 23 && minutes >= 59) {
        secs = 59;
        break;
      }
      mins++;
      secs -= 60;
    }
    while (secs < 0) {
      if (hours <= 0 && minutes <= 0) {
        secs = 0;
        break;
      }
      mins--;
      secs += 60;
    }
    setSeconds(secs);
    updateMinutes(minutes + mins);
  };

  const updateMinutes = (minutes: number) => {
    let mins = minutes;
    let hrs = 0;
    while (mins >= 60) {
      if (hours >= 23) {
        mins = 59;
        break;
      }
      hrs++;
      mins -= 60;
    }
    while (mins < 0) {
      if (hours <= 0) {
        mins = 0;
        break;
      }
      hrs--;
      mins += 60;
    }
    setMinutes(mins);
    updateHours(hours + hrs);
  };

  const updateHours = (hours: number) => {
    setHours(Math.max(0, Math.min(23, hours)));
  }

  const handleSeconds = (event: any) => { updateSeconds(parseInt(event.target.value.replace(/^0+/, "")) || 0); }
  const handleMinutes = (event: any) => { updateMinutes(parseInt(event.target.value.replace(/^0+/, "")) || 0); }
  const handleHours = (event: any) => { updateHours(parseInt(event.target.value.replace(/^0+/, "")) || 0); }

  function finalTime() {
    const time = (hours * 3600 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    addTime(time);
  }

  function reset() {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  async function resetAll() {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setTotalTime(0);
    setStartTime(0);

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        timer_state: {
          startTime: 0,
          currentTime: 0,
          pausedOnTime: 0,
          diffTime: 0,
          pauseTime: 0,
          totalPauseTime: 0,
          totalTime: 0,
          timer: 0,
          running: false,
          reset: false,
          resetPause: false,
          r2: false,
          addedTime: 0,
          updateAdded: false,
        },
      }),
    })
    const data = await res.json();

    setOpen(false);
    toast.success('Časovač bol vyresetovaný');
    console.log(data);
    router.refresh();

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      contentLabel="Add Time"
      className="custom-modal"
      overlayClassName="modal-overlay"
    >
      <div className="bg-white w-screen h-screen">
        <h1 className="text-center mt-16 text-black/50 text-md font-bold">{`Objednávka ${id}`}</h1>
        <div className="mx-5 h-[90vh] border border-black rounded-2xl relative">
          <div className="flex flex-row justify-between p-3">
            <button type="button" onClick={() => setOpen(false)}>
              <Image src="/close.svg" alt="Close" width="24" height="24" />
            </button>
            <h1 className="text-black text-md font-bold">Pridať hodiny</h1>
            <div className="w-6 h-6" />
          </div>
          <hr className="w-full h-px bg-black border-0" />

          <div className="mt-10 flex flex-col items-center">
            <div className="px-5 flex flex-row justify-center items-center gap-1 w-full h-14 bg-gray-100 text-3xl rounded-2xl border border-neutral-700">
              <input className="w-14" type="number" placeholder="Hours" value={hours} onChange={handleHours} />
              <p>:</p>
              <input className="w-14" type="number" placeholder="Minutes" value={minutes} onChange={handleMinutes} />
              <p>:</p>
              <input className="w-14" type="number" placeholder="Seconds" value={seconds} onChange={handleSeconds} />
            </div>
            <button className="mt-10" type="button" onClick={() => { setOpen(false); finalTime(); }}>
              <Image src="/confirm.svg" alt="Close" width="86" height="86" />
            </button>
            <button className="mt-8" type="button" onClick={() => reset()}>
              <div className="px-2 flex flex-row justify-center items-center gap-2 h-12 bg-white rounded-2xl border border-neutral-800">
                <Image src="/close.svg" alt="Add" width="28" height="28" />
                <div className="mr-3 text-black font-normal">Vynulovať</div>
              </div>
            </button>
            <button className="mt-8" type="button" onClick={() => resetAll()}>
              <div className="px-2 flex flex-row justify-center items-center gap-2 h-12 bg-white rounded-2xl border border-neutral-800">
                <Image src="/close.svg" alt="Add" width="28" height="28" />
                <div className="mr-3 text-black font-normal">Vynulovať celý timer</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddTime;
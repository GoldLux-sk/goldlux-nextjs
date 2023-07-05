'use client'

import React, {useEffect, useState} from 'react';
import { useModalState } from './context/ModalStateContext';
import Image from "next/image";
import AddTime from "@/components/common/modal/AddTime";

type TimerProps = {
  id: string
};

const Timer: React.FC<TimerProps> = ({id}) => {
  const {isAddOpen, setIsAddOpen} = useModalState();

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

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const days = parseInt(date.getTime() / 86400000 + ""); // ms / (1000 * 3600 * 24)

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return '--:--:--';

    return `${days > 0 ? days + 'd ' : ''}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (timer) {
      if (reset) {
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
      interval = setInterval(function () {
        setCurrentTime(new Date().getTime());
        setDiffTime(currentTime - startTime);

        if (!running) {
          if (!r2) setR2(true);
          if (resetPause) {
            setPausedOnTime(new Date().getTime());
            setPauseTime(0);
            setResetPause(false);
          }
          else setPauseTime(currentTime - pausedOnTime);
        }
        else {
          if (r2) setR2(false);
          if (pauseTime != 0) {
            if (pauseTime > 0) setTotalPauseTime(totalPauseTime + pauseTime);
            setPauseTime(0);
          } else setTotalTime(diffTime - totalPauseTime + addedTime);
          if (!resetPause) setResetPause(true);
        }
      }, 100);
    } else {
      if (!reset || r2) {
        if (pauseTime != 0) {
          if (pauseTime > 0) setTotalPauseTime(totalPauseTime + pauseTime);
          setPauseTime(0);
        }
        if (!resetPause) setResetPause(true);
        setTotalTime(diffTime - totalPauseTime + addedTime);
        if (reset) setR2(false);
        setReset(true);
      }
      if (!running) setRunning(true);
      if (updateAdded) {
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
    if (!timer) setTimer(true);
    if (!running) setRunning(true);
  }
  function pauseTimer() {
   if (running) setRunning(false);
  }
  function endTimer() {
    if(timer) setTimer(false);
  }

  function bgCol(): string {
    return !running ? 'bg-amber-100' : timer ? 'bg-green-100' : 'bg-gray-100';
  }

  function addTime(time: number) {
    setUpdateAdded(true);
    setAddedTime(Math.max(0, Math.min(24 * 3600 * 1000, time)));
    setTotalTime(diffTime - totalPauseTime + addedTime);
  }

  return (
    <div className="mt-3 flex flex-col justify-center items-center">
      <div className={`flex flex-col items-center w-[90vw] h-14 ${bgCol()} rounded-2xl border border-neutral-700`}>
        <p className=" h-7 text-black text-[40px] font-normal">{formatTime(new Date(totalTime).toISOString())}</p>
      </div>
      <button type="button" onClick={() => startTimer()} >
        <Image src="/start.svg" alt="Start" width="113" height="113" />
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

      <button className="mt-8" type="button" onClick={() => setIsAddOpen(true)}>
        <div className="flex flex-row justify-center items-center gap-2 w-[200px] h-12 bg-white rounded-2xl border border-neutral-800">
          <Image src="/plus.svg" alt="Add" width="28" height="28" />
          <div className="text-black font-normal">PRIDAŤ HODINY</div>
        </div>
      </button>

      <AddTime isOpen={isAddOpen} setOpen={setIsAddOpen} id={id} time={addedTime} addTime={addTime} />
    </div>
  );
};

export default Timer;
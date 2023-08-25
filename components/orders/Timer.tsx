import { useModalState } from './context/ModalStateContext';
import Image from 'next/image';
import AddTime from '@/components/common/modal/AddTime';
import { Play, Pause, Square, PlusSquare } from 'lucide-react';
import { toast } from 'sonner';
import { revalidatePath } from 'next/cache';
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import ActivityDuration from './ActivityDuration';

type TimerProps = {
  id: string;
  token: string | undefined;
  status: string;
  role: string | undefined;
  order: Order;
};

export default async function Timer({
  id,
  token,
  status,
  role,
  order,
}: TimerProps) {
  // async function updateTime(
  //   id: string,
  //   token: string | undefined,
  //   real_start: Date,
  //   real_end: Date
  // ) {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/order/${id}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `JWT ${token}`,
  //       },
  //       body: JSON.stringify({
  //         real_end: real_end,
  //         real_start: real_start,
  //         status: "ended",
  //       }),
  //     }
  //   ).then((res) => res.json());

  //   if (res.error) {
  //     throw new Error(res.error);
  //   }

  //   revalidatePath(`/order/${id}`);
  //   return res;
  // }

  function calculateElapsedTime(
    real_start: string | undefined,
    real_end: string | undefined
  ) {
    const start = new Date(real_start || '');
    const end = new Date(real_end || '');

    const elapsed = end.getTime() - start.getTime();

    // convert elapsed time to hh:mm:ss format
    const hours = Math.floor(elapsed / 1000 / 60 / 60);
    const minutes = Math.floor((elapsed / 1000 / 60) % 60);
    const seconds = Math.floor((elapsed / 1000) % 60);


    return (
      <div className="h-full w-full flex justify-center items-center slashed-zero tabular-nums">
        <p className='text-5xl'>
          {hours.toLocaleString().padStart(2, '0')}:
          {minutes.toLocaleString().padStart(2, '0')}:
          {seconds.toLocaleString().padStart(2, '0')}
        </p>
      </div>
    )
  }

  function showElapsedTime() {
    const start = new Date(order.real_start || '');
    const now = new Date();

    const elapsed = now.getTime() - start.getTime();

    // convert elapsed time to hh:mm:ss format
    const hours = Math.floor(elapsed / 1000 / 60 / 60);
    const minutes = Math.floor((elapsed / 1000 / 60) % 60);
    const seconds = Math.floor((elapsed / 1000) % 60);

    return (
      <div>
        <div className="h-full w-full flex justify-center items-center slashed-zero tabular-nums">
          <p className='text-5xl'>
            {hours.toLocaleString().padStart(2, '0')}
            {minutes.toLocaleString().padStart(2, '0')}
            {seconds.toLocaleString().padStart(2, '0')}
          </p>
        </div>
      </div>
    );
  }

  async function startTimer() {
    'use server';

    const now = new Date()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          real_start: now,
          status: 'started',
        }),
      }
    ).then((res) => res.json());

    if (res.error) {
      console.log(res.error);
    }

    revalidatePath(`/order/${id}`);

    return res;
  }


  async function endTimer() {
    'use server';

    const now = new Date().toISOString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          real_end: now,
          status: 'ended',
        }),
      }
    ).then((res) => res.json());

    if (res.error) {
      console.log(res.error);
    }

    revalidatePath(`/order/${id}`);

    return res;
  }

  return (
    <div className="mt-3 flex flex-col justify-center items-center">
      {role === 'admin' || role === 'cleaner' ? (
        <div>
          <div
            className={`flex items-center justify-centers w-full gap-5 mt-20`}
          >
            {status === 'cancelled' ? (
              <p className=" h-7 text-black text-4xl font-normal">
                - - : - - : - -
              </p>
            ) : (
              <div className="">
                {order.real_end !== null ? (
                  calculateElapsedTime(
                    order.real_start?.toLocaleString(),
                    order.real_end?.toLocaleString()
                  )
                ) : (
                  <div className='underline underline-offset-8'>
                    <ActivityDuration
                      startAt={order.real_start}
                    />
                  </div>
                )}
              </div>
            )}
            {status !== 'cancelled' && status !== 'ended' && (
              <form
                className="flex gap-5 justify-center items-center"
                action={status === 'started' ? endTimer : startTimer}
              >
                <button
                  type="submit"
                  className="bg-black text-white py-3 px-7 rounded-2xl text-xl"
                >
                  {status === 'planned' ? 'Start' : 'Stop'}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`flex flex-col items-center justify-center w-[90vw] h-16 rounded-2xl border border-gray-400 mt-20`}
          >
            {status === 'cancelled' ? (
              <p className=" h-7 text-black text-[40px] font-normal">
                - - : - - : - -
              </p>
            ) : (
              <div className="">
                {order.real_end !== null ? (
                  calculateElapsedTime(
                    order.real_start?.toLocaleString(),
                    order.real_end?.toLocaleString()
                  )
                ) : (
                  <div className=''>
                    <ActivityDuration
                      startAt={order.real_start}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

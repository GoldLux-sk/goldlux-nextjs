import { useModalState } from "./context/ModalStateContext";
import Image from "next/image";
import AddTime from "@/components/common/modal/AddTime";
import { Play, Pause, Square, PlusSquare } from "lucide-react";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";

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
    const start = new Date(real_start || "");
    const end = new Date(real_end || "");

    const elapsed = end.getTime() - start.getTime();

    // convert elapsed time to hh:mm:ss format
    const hours = Math.floor(elapsed / 1000 / 60 / 60);

    const minutes = Math.floor((elapsed / 1000 / 60 / 60 - hours) * 60);

    const seconds = Math.floor(
      ((elapsed / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );

    return `${hours.toLocaleString().padStart(2, "0")}:${minutes
      .toLocaleString()
      .padStart(2, "0")} : ${seconds.toLocaleString().padStart(2, "0")}`;
  }

  function showElapsedTime() {
    const start = new Date(order.real_start || "");
    const now = new Date();

    const elapsed = now.getTime() - start.getTime();

    // convert elapsed time to hh:mm:ss format
    const hours = Math.floor(elapsed / 1000 / 60 / 60);

    const minutes = Math.floor((elapsed / 1000 / 60 / 60 - hours) * 60);

    const seconds = Math.floor(
      ((elapsed / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );

    return `${hours.toLocaleString().padStart(2, "0")}:${minutes
      .toLocaleString()
      .padStart(2, "0")} : ${seconds.toLocaleString().padStart(2, "0")}`;
  }

  async function startTimer() {
    "use server";

    const now = new Date().toISOString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          real_start: now,
          status: "started",
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
    "use server";

    const now = new Date().toISOString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          real_end: now,
          status: "ended",
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
      {role === "admin" || role === "cleaner" ? (
        <div>
          <div
            className={`flex flex-col items-center w-[90vw] h-14 rounded-2xl border border-gray-400`}
          >
            {status === "cancelled" ? (
              <p className=" h-7 text-black text-[40px] font-normal">
                - - : - - : - -
              </p>
            ) : (
              <div className="text-black text-[40px] font-normal">
                {order.real_end !== null
                  ? calculateElapsedTime(
                      order.real_start?.toLocaleString(),
                      order.real_end?.toLocaleString()
                    )
                  : showElapsedTime()}
              </div>
            )}
          </div>
          {status === "ended" && (
            <div className="w-full flex items-center justify-center mt-5 gap-5">
              <p className="text-xl">Cena:</p>
              <p className="text-xl font-medium">
                {order.manual_price?.toFixed(2)}€
              </p>
            </div>
          )}
          {status !== "cancelled" && status !== "ended" && (
            <div className="mt-3 flex flex-col justify-center items-center">
              <form action={status === "started" ? endTimer : startTimer}>
                <button
                  type="submit"
                  className="bg-black text-white py-3 px-7 rounded-xl text-xl"
                >
                  {status === "started" ? "Stop" : "Start"}
                </button>
              </form>
              {/* <AddTime updateTime={updateTime} /> */}
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex flex-col items-center w-[90vw] h-14 rounded-2xl border border-neutral-700`}
        >
          {status === "cancelled" ? (
            <p className=" h-7 text-black text-[40px] font-normal">
              - - : - - : - -
            </p>
          ) : (
            <p className=" h-7 text-black text-[40px] font-normal">
              {/* {calculateElapsedTime(order.real_end?.toLocaleString())} */}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export default function ActivityDuration({
  startAt,
}: {
  startAt: string | undefined;
}) {

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = now.getTime() - new Date(startAt || "").getTime()

      setElapsed(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startAt]);

  const hours = Math.floor(elapsed / 1000 / 60 / 60);
  const minutes = Math.floor((elapsed / 1000 / 60) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);

  return (
    <div className="slashed-zero tabular-nums font-xl">
      {startAt === null ? (
        <div className="h-full w-full flex justify-center items-center slashed-zero tabular-nums">
          <p className="text-4xl">
            00:00:00
          </p>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center slashed-zero tabular-nums">
          <p className="text-4xl">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}{" "}
          </p>
        </div>
      )}
    </div>
  );
}

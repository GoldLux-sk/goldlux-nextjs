"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export default function ActivityDuration({
  startAt,
}: {
  startAt: string | undefined;
}) {
  const [elapsed, setElapsed] = useState(0);
  const now = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = now.getTime() - new Date(startAt || "").getTime();

      setElapsed(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  });

  const hours = Math.floor(elapsed / 1000 / 60 / 60);
  const minutes = Math.floor((elapsed / 1000 / 60) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);

  return (
    <div className="slashed-zero tabular-nums font-xl">
      {startAt === null ? (
        <div className="h-full w-full flex justify-center items-center">
          - - : - - : - -
        </div>
      ) : (
        <div className="slashed-zero tabular-nums font-xl">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}{" "}
        </div>
      )}
    </div>
  );
}

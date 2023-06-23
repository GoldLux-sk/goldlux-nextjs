'use client'

import { redirect } from "next/navigation"
import {SlidersHorizontal} from "lucide-react";
import React, {FunctionComponent} from "react";

const OpenFilter: FunctionComponent<{current: number}> = ({
  current
}) => {

  return (
    <form action={() => redirect("/filters?r=" + current)}>
      <button type="submit">
        <SlidersHorizontal className="w-6 h-6 text-black absolute left-4" />
      </button>
    </form>
  )
}

export default OpenFilter
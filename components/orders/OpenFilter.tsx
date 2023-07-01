'use client'

import { redirect } from "next/navigation"
import { SlidersHorizontal } from "lucide-react";
import React, { FunctionComponent, useState } from "react";
import FilterModal from "@/components/common/modal/FilterModal";

const OpenFilter: FunctionComponent = () => {

  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  return (
    <form action={() => setFilterOpen(true)}>
      <button type="submit">
        <SlidersHorizontal className="w-6 h-6 text-black absolute left-4 top-6" />
      </button>
      <FilterModal isOpen={isFilterOpen} setOpen={setFilterOpen} />
    </form>
  )
}

export default OpenFilter
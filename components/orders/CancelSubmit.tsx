'use client'

import React, { useEffect, useState } from 'react';
import { useModalState } from './context/ModalStateContext';
import Image from "next/image";
import { useRouter } from 'next/navigation'
import CancelOrder from "@/components/common/modal/CancelOrder";
import { XSquare, CheckSquare } from "lucide-react";

type CancelSubmit = {
  id: string
  token: string | undefined
};

const CancelSubmit: React.FC<CancelSubmit> = ({ id, token }) => {
  const { isCancelOpen, setIsCancelOpen } = useModalState();
  const router = useRouter();

  // TODO
  async function cancelOrder() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        status: "cancelled",
      }),
    }).then(res => res.json());

    console.log(res);
    router.push("/orders");
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <button type="button" onClick={() => setIsCancelOpen(true)}>
        <div className="flex justify-center items-center gap-2 px-7 py-2 bg-white rounded-xl border-2 border-black ">
          <div className="text-black font-medium">Zrušiť Objednávku</div>
          <XSquare size={32} strokeWidth={1} />
        </div>
      </button>


      <CancelOrder isOpen={isCancelOpen} setOpen={setIsCancelOpen} id={id} cancelOrder={cancelOrder} />
    </div>
  );
};

export default CancelSubmit;

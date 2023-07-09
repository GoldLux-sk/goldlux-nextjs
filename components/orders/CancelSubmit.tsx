'use client'

import React, { useEffect, useState } from 'react';
import { useModalState } from './context/ModalStateContext';
import Image from "next/image";
import { useRouter } from 'next/navigation'
import CancelOrder from "@/components/common/modal/CancelOrder";

type CancelSubmit = {
  id: string
  token: string | undefined
};

const CancelSubmit: React.FC<CancelSubmit> = ({ id, token }) => {
  const { isCancelOpen, setIsCancelOpen } = useModalState();
  const router = useRouter();

  //TODO
  async function submitOrder() {
    router.push("/orders");
  }

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
    <div className="flex flex-col justify-center items-center">
      <button className="mt-8" type="button" onClick={() => setIsCancelOpen(true)}>
        <div className="flex flex-row justify-center items-center gap-2 w-[200px] h-12 bg-white rounded-2xl border border-neutral-800">
          <Image src="/close.svg" alt="Add" width="28" height="28" />
          <div className=" text-black font-normal">Zrušiť Objednávku</div>
        </div>
      </button>
      <button className="mt-8 mb-6" type="button" onClick={() => submitOrder()}>
        <div className="flex flex-col justify-center items-center w-[132px] h-[63px] bg-white rounded-2xl border border-neutral-800">
          <p className="text-center text-black text-[24px] font-normal">HOTOVO</p>
        </div>
      </button>

      <CancelOrder isOpen={isCancelOpen} setOpen={setIsCancelOpen} id={id} cancelOrder={cancelOrder} />
    </div>
  );
};

export default CancelSubmit;

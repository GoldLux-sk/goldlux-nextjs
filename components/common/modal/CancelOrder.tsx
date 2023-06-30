'use client'

import React, {FunctionComponent} from "react";
import Image from "next/image";
import Modal from 'react-modal';

type CancelOrderProps = {
  isOpen: boolean,
  setOpen: (_: boolean) => void,
  id: string,
  cancelOrder: () => void,
}

const CancelOrder: FunctionComponent<CancelOrderProps> = ({
  isOpen, setOpen, id, cancelOrder
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      contentLabel="Cancel Order"
      className="custom-modal"
    >
      <div className="bg-white w-screen">
        <h1 className="text-center mt-8 text-black/50 text-md font-bold">{`Objednávka ${id}`}</h1>
        <div className="mx-5 h-[90vh] border border-black rounded-2xl relative">
          <div className="flex flex-row justify-between p-3">
            <button type="button" onClick={() => setOpen(false)}>
              <Image src="/close.svg" alt="Close" width="24" height="24"/>
            </button>
            <h1 className="text-black text-md font-bold">Zrušiť objednávku?</h1>
            <div className="w-6 h-6"/>
          </div>
          <hr className="w-full h-px bg-black border-0"/>

          <div className="mt-10 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-5">
              <button type="button" onClick={() => setOpen(false)}>
                <div className="w-[40vw] h-12 px-5 py-[13px] bg-rose-500 rounded-2xl border border-zinc-800 justify-center items-center gap-2.5">
                  <div className="text-center text-white text-[17px] font-semibold leading-snug">Naspäť</div>
                </div>
              </button>
              <button type="button" onClick={() => {setOpen(false); cancelOrder();}}>
                <div className="w-full h-12 px-5 py-[13px] bg-rose-500 rounded-2xl border border-zinc-800 justify-center items-center gap-2.5">
                  <div className="text-center text-white text-[17px] font-semibold leading-snug">Zrušiť</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CancelOrder;
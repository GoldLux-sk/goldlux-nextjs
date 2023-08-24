'use client'

import React, { FunctionComponent } from "react";
import Image from "next/image";
import Modal from 'react-modal';

type CancelOrderProps = {
  isOpen: boolean,
  setOpen: (open: boolean) => void,
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
      overlayClassName="modal-overlay"
    >
      <div className="w-screen h-screen relative">
        <div className="mx-5 h-screen border-grat rounded-2xl flex items-center justify-center flex-col">
          <div className="flex flex-row justify-between p-3">
            <h1 className="text-black text-3xl font-medium">Naozaj chcete zrušiť objednávku?</h1>
          </div>

          <div className="mt-10 flex flex-col items-center w-full">
            <div className="grid grid-cols-2 gap-5 w-full">
              <button type="button" onClick={() => setOpen(false)}>
                <div className="px-10 py-4 bg-white border-black rounded-3xl border-2 justify-center items-center gap-2.5">
                  <div className="text-center text-black text-[17px] font-medium leading-snug">Naspäť</div>
                </div>
              </button>
              <button type="button" onClick={() => { setOpen(false); cancelOrder(); }}>
                <div className="px-10 py-4 bg-black rounded-3xl border justify-center items-center gap-2.5">
                  <div className="text-center text-white text-[17px] font-medium leading-snug">Zrušiť</div>
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
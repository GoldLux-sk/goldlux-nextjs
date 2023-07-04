'use client'
import React, { createContext, useState, useContext } from 'react';
import Modal from 'react-modal';

type ModalStateContextProps = {
    isAddOpen: boolean;
    isCancelOpen: boolean;
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalStateContext = createContext<ModalStateContextProps | undefined>(undefined);

export const ModalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);

    Modal.setAppElement('body');

    return (
        <ModalStateContext.Provider value={{ isAddOpen, setIsAddOpen, isCancelOpen, setIsCancelOpen }}>
            {children}
        </ModalStateContext.Provider>
    );
};


export const useModalState = () => {
    const context = useContext(ModalStateContext);
    if (!context) {
        throw new Error('useModalState must be used within a ModalStateProvider');
    }
    return context;
};

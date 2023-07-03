'use client'
import React, { createContext, useState, useContext } from 'react';
import Modal from 'react-modal';

type CustomerStateContextProps = {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const CustomerStateContext = createContext<CustomerStateContextProps | undefined>(undefined);

export const CustomerStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selected, setSelected] = useState<string>('');

    Modal.setAppElement('body');

    return (
        <CustomerStateContext.Provider value={{ selected, setSelected }}>
            {children}
        </CustomerStateContext.Provider>
    );
};


export const useCustomerState = () => {
    const context = useContext(CustomerStateContext);
    if (!context) {
        throw new Error('useCustomerState must be used within a CustomerStateProvider');
    }
    return context;
};

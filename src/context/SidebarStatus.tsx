import React, { createContext, useState, ReactNode } from "react";

interface SidebarStatusContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const defaultValue: SidebarStatusContextProps = {
  isOpen: false,
  setIsOpen: () => {
    /* eslint-disable @typescript-eslint/no-empty-function */
  },
};

export const SidebarStatusContext = createContext<SidebarStatusContextProps>(defaultValue);

interface SidebarStatusProviderProps {
  children: ReactNode;
}

export const SidebarStatusProvider: React.FC<SidebarStatusProviderProps> = ({ children }) => {
  const [isOpen, setStatus] = useState<boolean>(false);

  function setIsOpen(value: boolean) {
    setStatus(value);
  }

  return <SidebarStatusContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarStatusContext.Provider>;
};

import React, { createContext, useState, ReactNode, useMemo } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return <SidebarStatusContext.Provider value={value}>{children}</SidebarStatusContext.Provider>;
};

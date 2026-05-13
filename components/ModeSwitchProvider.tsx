'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type ModeContextValue = {
  isMachineMode: boolean;
  toggle: () => void;
};

const ModeContext = createContext<ModeContextValue>({
  isMachineMode: false,
  toggle: () => {},
});

export function useMode() {
  return useContext(ModeContext);
}

export function ModeSwitchProvider({ children }: { children: ReactNode }) {
  const [isMachineMode, setMachineMode] = useState(false);

  return (
    <ModeContext.Provider
      value={{
        isMachineMode,
        toggle: () => setMachineMode((prev) => !prev),
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

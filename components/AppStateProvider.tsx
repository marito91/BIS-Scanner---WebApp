"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Socket } from "socket.io-client";
import { toast } from "react-toastify";

import useSocket from "../lib/useSocket";
import hostbase from "../src/hostbase.js";

// App-wide state that src/App.js (the old CRA root) owned and passed down as
// props to whichever route was active: a single socket connection keyed on
// `hostbase`, and the showNotification toast helper. The App Router has no such
// root component, so this Client Component is its new home — mounted once in
// app/(protected)/layout.tsx and read by pages via useAppState().
//
// Scope note: user/setUser from App.js is deliberately NOT here. That state is
// only ever consumed by Devices.tsx, so it lives there as local state instead
// (wired in alongside app/(protected)/devices/page.tsx).

interface AppState {
  socket: Socket | null;
  showNotification: (title: string, message: string) => void;
}

const AppStateContext = createContext<AppState | null>(null);

// Ported as-is from src/App.js: same title-to-toast-type mapping.
function showNotification(title: string, message: string) {
  if (title === "Alert" || title === "Warning") {
    toast(title + ": " + message, { type: toast.TYPE.WARNING });
  } else if (title === "Success" || title === "Ok" || title === "OK") {
    toast(title + ": " + message, { type: toast.TYPE.SUCCESS });
  } else {
    toast(title + ": " + message, { type: toast.TYPE.ERROR });
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const socket = useSocket(hostbase);

  // showNotification is a stable module-level function, so `socket` is the only
  // thing that can change the context value.
  const value = useMemo<AppState>(() => ({ socket, showNotification }), [socket]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppState {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}

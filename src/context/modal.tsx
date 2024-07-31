"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface TaskModalContextProps {
  children: ReactNode;
}
interface TaskModalContextType {
  open: boolean;
  btnId: number;
  showDrawer: (btnId: number) => void;
  onClose: () => void;
}
const TaskModalContext = createContext<TaskModalContextType | null>(null);

export const TaskModalProvider = ({ children }: TaskModalContextProps) => {
  const [open, setOpen] = useState(false);
  const [btnId, setBtnId] = useState(0);
  const showDrawer = (id: number) => {
    setBtnId(id);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <TaskModalContext.Provider value={{ open, btnId, showDrawer, onClose }}>
      {children}
    </TaskModalContext.Provider>
  );
};

export const useTaskModal = (): TaskModalContextType => {
  const context = useContext(TaskModalContext);
  if (!context) {
    throw new Error("useTaskModal must be used within a TaskModalProvider");
  }
  return context;
};

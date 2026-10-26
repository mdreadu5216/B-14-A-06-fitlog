"use client";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PlanProvider>
      {children}
      <ToastContainer theme="dark" position="top-right" autoClose={2000} />
    </PlanProvider>
  );
}
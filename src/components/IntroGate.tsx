"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import IntroAnimation from "./IntroAnimation";

const SESSION_KEY = "welcome-intro-shown";

export default function IntroGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"checking" | "showing" | "done">("checking");

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "true";
    setStatus(alreadyShown ? "done" : "showing");
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setStatus("done");
  }, []);

  if (status === "checking") return null;

  return (
    <>
      {children}
      {status === "showing" && <IntroAnimation onComplete={handleComplete} />}
    </>
  );
}
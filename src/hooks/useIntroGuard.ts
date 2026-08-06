import { useEffect, useState, useCallback } from "react";

const INTRO_KEY = "welcome-intro-shown";
const SESSION_ALIVE_KEY = "browser-session-alive";

export function useIntroGuard() {
  const [shouldShowIntro, setShouldShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const sessionAlive = sessionStorage.getItem(SESSION_ALIVE_KEY);
    const introShown = localStorage.getItem(INTRO_KEY);

    if (!sessionAlive) {
      // Browser was fully closed OR this is a brand new tab
      // Check if any other tab has the session flag by looking at localStorage timestamp
      const lastActive = localStorage.getItem("last-active-timestamp");
      const now = Date.now();

      // If no recent activity (5 sec gap = browser was closed), reset intro
      if (!lastActive || now - parseInt(lastActive) > 5000) {
        localStorage.removeItem(INTRO_KEY);
        setShouldShowIntro(true);
      } else {
        // Another tab is/was recently open → same browser session
        setShouldShowIntro(introShown !== "true");
      }

      sessionStorage.setItem(SESSION_ALIVE_KEY, "true");
    } else {
      // Same tab, already been here
      setShouldShowIntro(introShown !== "true");
    }

    // Heartbeat: update timestamp every 2s while tab is open
    const heartbeat = setInterval(() => {
      localStorage.setItem("last-active-timestamp", Date.now().toString());
    }, 2000);

    localStorage.setItem("last-active-timestamp", Date.now().toString());

    return () => clearInterval(heartbeat);
  }, []);

  const markIntroComplete = useCallback(() => {
    localStorage.setItem(INTRO_KEY, "true");
    setShouldShowIntro(false);
  }, []);

  return { shouldShowIntro, markIntroComplete };
}
import { useEffect, useState } from "react";

const CHANNEL_NAME = "bishant-intro-guard";
const STORAGE_KEY = "bishant-intro-seen";

export function useIntroGuard() {
  const [shouldShowIntro, setShouldShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen = localStorage.getItem(STORAGE_KEY) === "true";

    if (!alreadySeen) {
      setShouldShowIntro(true);
      localStorage.setItem(STORAGE_KEY, "true");
      return;
    }

    const channel = new BroadcastChannel(CHANNEL_NAME);
    let respondedByOtherTab = false;

    channel.postMessage("ping");

    const handleMessage = (e: MessageEvent) => {
      if (e.data === "pong") {
        respondedByOtherTab = true;
      }
      if (e.data === "ping") {
        channel.postMessage("pong");
      }
    };

    channel.addEventListener("message", handleMessage);

    const timer = setTimeout(() => {
      if (respondedByOtherTab) {
        setShouldShowIntro(false);
      } else {
        setShouldShowIntro(true);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, []);

  const markIntroComplete = () => {
    setShouldShowIntro(false);
  };

  return { shouldShowIntro, markIntroComplete };
}
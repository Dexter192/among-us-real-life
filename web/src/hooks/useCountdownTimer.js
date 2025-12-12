import { useState, useEffect } from "react";

export function useCountdownTimer(endTimeUTC) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!endTimeUTC) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const endTime = new Date(endTimeUTC).getTime();
      const remaining = Math.max(0, endTime - Date.now());
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTimeUTC]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return { timeLeft, formatTime };
}

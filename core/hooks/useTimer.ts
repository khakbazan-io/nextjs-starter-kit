import { useState, useEffect, useRef } from "react";

interface UseTimerOptions {
  initialSeconds?: number;
  onTimeDone?: VoidFunction;
}

interface TimeObject {
  hours: string;
  minutes: string;
  seconds: string;
}

interface UseTimerReturn {
  start: () => void;
  reset: () => void;
  restart: () => void;
  isTimeDone: boolean;
  remainingTime: TimeObject;
}

const secondsToTimeObject = (totalSeconds: number): TimeObject => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: hours < 10 ? `0${hours}` : `${hours}`,
    minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
  };
};

export const useTimer = ({
  initialSeconds = 180,
  onTimeDone,
}: UseTimerOptions = {}): UseTimerReturn => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isTimeDone, setIsTimeDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (intervalRef.current) return;

    setIsTimeDone(false);
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsTimeDone(true);

          onTimeDone?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRemainingSeconds(initialSeconds);
    setIsTimeDone(false);
  };

  const restart = () => {
    reset();
    start();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    start,
    reset,
    restart,
    isTimeDone,
    remainingTime: secondsToTimeObject(remainingSeconds),
  };
};

import { useState, useEffect, useRef } from "react";

/**
 * Options for configuring the timer.
 */
interface UseTimerOptions {
  initialSeconds?: number; // The initial countdown time in seconds (default: 180)
  onTimeDone?: VoidFunction; // Callback function triggered when the timer reaches zero
}

/**
 * Represents the time breakdown in hours, minutes, and seconds.
 */
interface TimeObject {
  hours: string;
  minutes: string;
  seconds: string;
}

/**
 * Return type of the useTimer hook.
 */
interface UseTimerReturn {
  start: () => void; // Function to start the timer
  reset: () => void; // Function to reset the timer to its initial value
  restart: () => void; // Function to reset and start the timer
  isTimeDone: boolean; // Boolean indicating if the timer has completed
  remainingTime: TimeObject; // The formatted remaining time as an object
}

/**
 * Converts total seconds into a formatted time object.
 *
 * @param {number} totalSeconds - The total number of seconds.
 * @returns {TimeObject} The formatted time object with hours, minutes, and seconds.
 */
const secondsToTimeObject = (totalSeconds: number): TimeObject => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

/**
 * A custom hook for managing a countdown timer.
 *
 * @param {UseTimerOptions} options - Configuration options for the timer.
 * @returns {UseTimerReturn} An object containing control functions and timer state.
 */
export const useTimer = ({
  initialSeconds = 180,
  onTimeDone,
}: UseTimerOptions = {}): UseTimerReturn => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isTimeDone, setIsTimeDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Starts the timer if it's not already running.
   */
  const start = () => {
    if (intervalRef.current) return; // Prevent multiple intervals

    setIsTimeDone(false);
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsTimeDone(true);
          onTimeDone?.(); // Trigger callback when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /**
   * Resets the timer to the initial value and stops it.
   */
  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRemainingSeconds(initialSeconds);
    setIsTimeDone(false);
  };

  /**
   * Resets the timer and immediately starts it again.
   */
  const restart = () => {
    reset();
    start();
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    start, // Start the timer
    reset, // Reset the timer
    restart, // Restart the timer
    isTimeDone, // Whether the timer has finished
    remainingTime: secondsToTimeObject(remainingSeconds), // Formatted time object
  };
};

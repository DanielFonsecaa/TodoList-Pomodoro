import { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimatePresence } from "framer-motion";

const Timer = () => {
  const workMinutes = 25;
  const breakMinutes = 5;

  const [timeLeft, setTimeLeft] = useState<number>(workMinutes * 60);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isWork, setIsWork] = useState<boolean>(true);
  const [hasPopup, setHasPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const timeLeftRef = useRef<number>(timeLeft);
  const isPausedRef = useRef<boolean>(isPaused);
  const isWorkRef = useRef<boolean>(isWork);

  const tick = () => {
    timeLeftRef.current--;
    setTimeLeft(timeLeftRef.current);
  };
  const playSoundAndPopup = () => {
    console.log("ISwORKS", isWork);
    const audio = isWorkRef.current
      ? new Audio("/backToWork.mp3")
      : new Audio("/coffe.mp3");
    audio.play();
    setPopupMessage(
      isWorkRef.current ? "Back to work!" : "Take a coffee break!"
    );
    setHasPopup(true);

    audio.onended = () => {
      setIsPaused(false);
      isPausedRef.current = false;
      setHasPopup(false);
    };
  };

  const handleSwitchMode = () => {
    const nextMode = !isWorkRef.current;
    const nextSeconds = (nextMode ? workMinutes : breakMinutes) * 60;

    setIsWork(nextMode);
    isWorkRef.current = nextMode;

    setTimeLeft(nextSeconds);
    timeLeftRef.current = nextSeconds;

    setIsPaused(true);
    isPausedRef.current = true;

    playSoundAndPopup();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (timeLeftRef.current === 0) return handleSwitchMode();

      tick();
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const totalSeconds = isWork ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((timeLeft / totalSeconds) * 100);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return (
    <div className="w-fit m-auto text-center">
      <h2 className=" mb-5 text-2xl tracking-wider">
        {isWork ? "Work Time" : "Break Time"}
      </h2>
      <div className="font-sans  font-bold tracking-wider">
        <CircularProgressbar
          value={percentage}
          text={formattedMinutes + ":" + formattedSeconds}
          styles={buildStyles({
            textColor: isWork ? "#6a2d99" : "#8E5A8D",
            pathColor: isWork ? "#6a2d99" : "#8E5A8D",
            trailColor: "#DADADA",
            strokeLinecap: "butt",
          })}
        />
      </div>
      <div className="flex justify-evenly pt-5">
        <AnimatePresence mode="wait">
          {isPaused ? (
            <motion.button
              key="play" // Unique key for Framer Motion to track animations
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
              className="cursor-pointer text-purple-700 hover:scale-110"
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              key="pause" // Unique key for Framer Motion to track animations
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
              className="cursor-pointer text-purple-700 hover:scale-110"
              initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            const resetTime = isWork ? workMinutes * 60 : breakMinutes * 60;
            setTimeLeft(resetTime);
            timeLeftRef.current = resetTime;
            setIsPaused(true);
            isPausedRef.current = true;
          }}
          className="cursor-pointer text-purple-700 hover:scale-110 active:rotate-180 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/45">
          <div className="bg-[#C0C0C0] p-5 rounded-lg">
            <p>{popupMessage}</p>
            <button
              onClick={() => setHasPopup(false)}
              className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;

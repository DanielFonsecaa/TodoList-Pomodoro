import { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
      <h2 className="font-bold mb-5 text-2xl tracking-wider">
        {isWork ? "Work Session" : "Break Session"}
      </h2>
      <div className="">
        <CircularProgressbar
          value={percentage}
          text={formattedMinutes + ":" + formattedSeconds}
          styles={buildStyles({
            textColor: isWork ? "#a751fb" : "#00ffd7",
            pathColor: isWork ? "#a751fb" : "#00ffd7",
            trailColor: "#f9f9f9",
          })}
        />
      </div>
      <div className="flex gap-3 w-fit m-auto p-4">
        {isPaused ? (
          <button
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
            className="cursor-pointer bg-purple-500 text-white rounded-lg hover:bg-purple-700 active:bg-purple-300 p-4 transition-all duration-300 active:translate-y-5"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
            className="cursor-pointer bg-purple-500 text-white rounded-lg hover:bg-purple-700  active:bg-purple-300 p-4 transition-all duration-300 active:translate-y-5"
          >
            Pause
          </button>
        )}

        <button
          onClick={() => {
            const resetTime = isWork ? workMinutes * 60 : breakMinutes * 60;
            setTimeLeft(resetTime);
            timeLeftRef.current = resetTime;
            setIsPaused(true);
            isPausedRef.current = true;
          }}
          className="cursor-pointer bg-purple-500 text-white rounded-lg hover:bg-purple-700  active:bg-purple-300 p-4 transition-all duration-300 active:translate-x-5"
        >
          Reset
        </button>
      </div>
      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/45">
          <div className="bg-white p-5 rounded-lg shadow-lg shadow-purple-500">
            <p>{popupMessage}</p>
            <button
              onClick={() => setHasPopup(false)}
              className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
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

import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

interface TourControlsProps {
  onStartTour: () => void;
  onNextFrame: () => void;
  onPreviousFrame: () => void;
  isTourStarted: boolean;
  currentFrameIndex: number;
  totalFrames: number;
  onQuitTour?: () => void;
}

const TourControls: React.FC<TourControlsProps> = ({
  onStartTour,
  onNextFrame,
  onPreviousFrame,
  isTourStarted,
  currentFrameIndex,
  totalFrames,
  onQuitTour = () => {},
}) => {
  // Keyboard controls management
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTourStarted) {
        // If tour hasn't started, space or enter to start
        if (event.key === " " || event.key === "Enter") {
          onStartTour();
        }
      } else {
        // If tour is in progress
        switch (event.key) {
          case "ArrowRight":
          case "d":
            if (currentFrameIndex < totalFrames - 1) {
              onNextFrame();
            }
            break;
          case "ArrowLeft":
          case "q":
          case "a":
            if (currentFrameIndex > 0) {
              onPreviousFrame();
            }
            break;
          case "Escape":
            onQuitTour();
            break;
        }
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isTourStarted,
    currentFrameIndex,
    totalFrames,
    onStartTour,
    onNextFrame,
    onPreviousFrame,
    onQuitTour,
  ]);

  if (!isTourStarted) {
    return (
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4 items-center">
        <button
          onClick={onStartTour}
          className="bg-white/20 hover:bg-white/30 px-10 py-4 rounded-full text-white flex items-center gap-3 shadow-lg"
        >
          <Play size={24} />
          <span className="text-lg font-semibold">Start the Tour</span>
        </button>
        <div className="text-white/60 text-xs mt-2 absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          Press Space or Enter to start
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 items-center bg-black/40 backdrop-blur-md p-2 rounded-full shadow-lg"
      style={{ width: "auto", height: "auto" }}
    >
      <button
        onClick={onPreviousFrame}
        disabled={currentFrameIndex === 0}
        className={`bg-white/20 p-2 rounded-full text-white w-[36px] h-[36px] flex items-center justify-center
          ${
            currentFrameIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white/30"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      <div className="text-white bg-white/10 px-4 py-1 rounded-full text-sm font-medium min-w-[80px] text-center">
        {currentFrameIndex + 1} / {totalFrames}
      </div>

      <button
        onClick={onNextFrame}
        disabled={currentFrameIndex === totalFrames - 1}
        className={`bg-white/20 p-2 rounded-full text-white w-[36px] h-[36px] flex items-center justify-center
          ${
            currentFrameIndex === totalFrames - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white/30"
          }`}
      >
        <ChevronRight size={18} />
      </button>

      <button
        onClick={onQuitTour}
        className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white flex items-center gap-1 ml-2"
        title="Exit tour (Esc)"
      >
        <X size={14} />
        <span className="text-xs">Exit</span>
      </button>

      <div className="text-white/60 text-xs absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        ← Q/A → D | Esc to exit
      </div>
    </div>
  );
};

export default TourControls;

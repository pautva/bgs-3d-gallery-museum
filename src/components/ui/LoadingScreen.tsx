import React, { useLayoutEffect } from "react";
import { Html, useProgress } from "@react-three/drei";
import { Instagram } from "lucide-react";

const LoadingScreen = ({
  setIsLoading,
}: {
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const { progress, item, loaded, total } = useProgress();

  useLayoutEffect(() => {
    setIsLoading(true);

    return () => {
      setIsLoading(false);
    };
  });

  return (
    <Html fullscreen>
      <div className="w-full h-full flex flex-col items-center justify-center bg-black">
        <div className="flex items-center mb-8">
          <Instagram size={40} className="text-white mr-3" />
          <h1 className="text-white text-3xl font-bold">MJKDraw</h1>
        </div>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex flex-col items-center text-white">
          <div className="text-lg font-medium mb-2">
            {Math.round(progress)}% loaded
          </div>
          {item && (
            <div className="text-xs text-gray-400 max-w-xs text-center truncate">
              Loading: {item}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            {loaded}/{total} assets loaded
          </div>
        </div>
      </div>
    </Html>
  );
};

export default LoadingScreen;

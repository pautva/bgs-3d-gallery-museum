import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { Instagram } from "lucide-react";
import Museum from "./components/Museum";
import LoadingScreen from "./components/ui/LoadingScreen";
import Controls from "./components/ui/Controls";
import TourControls from "./components/ui/TourControls";
import { ImageMetadata } from "./types/museum";
import { drawingImages } from "./config/imagesConfig";
import { Perf } from "r3f-perf";

function App() {
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTourStarted, setIsTourStarted] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(-1);

  useEffect(() => {
    setImages(drawingImages);
  }, []);

  const handleStartTour = () => {
    setIsTourStarted(true);
    setCurrentFrameIndex(0);
  };

  const handleNextFrame = () => {
    if (currentFrameIndex < images.length - 1) {
      setCurrentFrameIndex(currentFrameIndex + 1);
    }
  };

  const handlePreviousFrame = () => {
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(currentFrameIndex - 1);
    }
  };

  const handleQuitTour = () => {
    setIsTourStarted(false);
    setCurrentFrameIndex(-1);
  };

  const handleFrameChange = (index: number) => {
    setCurrentFrameIndex(index);
    setIsTourStarted(index >= 0);
  };

  return (
    <div className="relative w-full h-screen">
      <Canvas
        shadows
        camera={{
          position: [0, 2, 14],
          fov: 60,
        }}
        dpr={1.5}
      >
        <Preload all />
        <Perf />
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={<LoadingScreen setIsLoading={setIsLoading} />}>
          <Museum
            images={images}
            onFrameChange={handleFrameChange}
            currentFrameIndex={currentFrameIndex}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {!isLoading && (
        <>
          <a
            className="absolute top-0 left-0 p-4 text-white flex items-center hover:scale-105 transition-all duration-300"
            href="https://www.instagram.com/mjkdraw/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="mr-2" />
            <h1 className="text-xl font-bold">MJKDraw</h1>
          </a>

          <Controls />

          <TourControls
            onStartTour={handleStartTour}
            onNextFrame={handleNextFrame}
            onPreviousFrame={handlePreviousFrame}
            isTourStarted={isTourStarted}
            currentFrameIndex={currentFrameIndex}
            totalFrames={images.length}
            onQuitTour={handleQuitTour}
          />
        </>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Environment,
  Preload,
} from "@react-three/drei";
import { Instagram } from "lucide-react";
import Museum from "./components/Museum";
import LoadingScreen from "./components/ui/LoadingScreen";
import Controls from "./components/ui/Controls";
import TourControls from "./components/ui/TourControls";
import { ImageMetadata } from "./types/museum";
import { drawingImages } from "./config/imagesConfig";
import { Perf } from "r3f-perf";
import SwipeableContainer from "./components/ui/SwipeableContainer";
import { TourProvider } from "./contexts/TourContext";

function App() {
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImages(drawingImages);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <TourProvider totalFrames={images.length}>
        <SwipeableContainer>
          <Canvas
            shadows
            camera={{
              position: [0, 2, 14],
              fov: 60,
            }}
            dpr={[1.5, 2.5]}
          >
            <Preload all />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            {/* <Perf /> */}
            <color attach="background" args={["#000000"]} />
            <Suspense fallback={<LoadingScreen setIsLoading={setIsLoading} />}>
              <Museum images={images} />
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

              <TourControls />
            </>
          )}
        </SwipeableContainer>
      </TourProvider>
    </div>
  );
}

export default App;

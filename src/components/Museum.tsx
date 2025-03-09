import React, { useRef } from "react";
import * as THREE from "three";
import Frame from "./museum/Frame";
import Room from "./museum/Room";
import { calculateFramePositions } from "../utils/framePositioning";
import { defaultRoomDimensions } from "../config/roomConfig";
import { ImageMetadata } from "../types/museum";
import { BakeShadows } from "@react-three/drei";
import { ZoomProvider } from "../contexts/ZoomContext";
import { CameraManager } from "./museum/CameraManager";
import SpotlightGroup from "./museum/SpotlightGroup";

interface MuseumProps {
  images: ImageMetadata[];
  onFrameChange?: (index: number) => void;
  currentFrameIndex?: number;
}

const Museum: React.FC<MuseumProps> = ({
  images,
  onFrameChange,
  currentFrameIndex = -1,
}) => {
  const frameRefs = useRef<(THREE.Mesh | null)[]>([]);

  React.useEffect(() => {
    frameRefs.current = frameRefs.current.slice(0, images.length);
    while (frameRefs.current.length < images.length) {
      frameRefs.current.push(null);
    }
  }, [images.length]);

  const { framePositions, frameRotations } = calculateFramePositions(
    defaultRoomDimensions,
    images.length
  );

  return (
    <ZoomProvider>
      <CameraManager
        onFrameChange={onFrameChange}
        currentFrameIndex={currentFrameIndex}
        frameRefs={frameRefs as React.MutableRefObject<THREE.Mesh[]>}
        imagesCount={images.length}
      />
      <BakeShadows />

      <group>
        <Room
          width={defaultRoomDimensions.width}
          length={defaultRoomDimensions.length}
          height={defaultRoomDimensions.height}
          wallTiltAngle={defaultRoomDimensions.wallTiltAngle}
        />

        {images.map((image, index) => {
          if (index < framePositions.length) {
            return (
              <React.Fragment key={index}>
                <Frame
                  position={framePositions[index]}
                  rotation={frameRotations[index]}
                  image={image}
                  index={index}
                  ref={(el) => {
                    frameRefs.current[index] = el;
                  }}
                  onFrameClick={(idx) => {
                    if (onFrameChange) {
                      if (idx === currentFrameIndex) {
                        onFrameChange(-1);
                      } else {
                        onFrameChange(idx);
                      }
                    }
                  }}
                />
              </React.Fragment>
            );
          }
          return null;
        })}

        <ambientLight intensity={0.3} />
        <directionalLight intensity={2.5} position={[0, -100, 5]} />

        <SpotlightGroup roomHeight={defaultRoomDimensions.height} />
      </group>
    </ZoomProvider>
  );
};

export default Museum;

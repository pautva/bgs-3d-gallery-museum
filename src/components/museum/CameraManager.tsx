import React, { useRef, useCallback, useContext, useEffect } from "react";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import { ZoomContext } from "../../contexts/ZoomContext";

interface CameraManagerProps {
  onFrameChange?: (index: number) => void;
  currentFrameIndex: number;
  frameRefs: React.MutableRefObject<(THREE.Mesh | null)[]>;
  imagesCount: number;
}

const CameraManager: React.FC<CameraManagerProps> = ({
  onFrameChange,
  currentFrameIndex,
  frameRefs,
  imagesCount,
}) => {
  const cameraControlsRef = useRef<CameraControls>(null);
  const { setZoomedFrameId } = useContext(ZoomContext);

  useEffect(() => {
    if (currentFrameIndex >= 0) {
      setZoomedFrameId(currentFrameIndex);
    } else {
      setZoomedFrameId(null);
    }
  }, [currentFrameIndex, setZoomedFrameId]);

  const zoomToFrame = useCallback(
    async (index: number) => {
      if (!cameraControlsRef.current) return;

      const mesh = frameRefs.current[index];
      if (!mesh) return;

      const frameWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(frameWorldPosition);

      const localFrontPoint = new THREE.Vector3(0, 0, 1);
      const worldFrontPoint = localFrontPoint.clone();
      mesh.localToWorld(worldFrontPoint);

      const frontDirection = worldFrontPoint
        .clone()
        .sub(frameWorldPosition)
        .normalize();

      const targetPosition = frameWorldPosition
        .clone()
        .add(frontDirection.multiplyScalar(2.5));

      await cameraControlsRef.current.setLookAt(
        targetPosition.x,
        targetPosition.y - 0.1,
        targetPosition.z,
        frameWorldPosition.x,
        frameWorldPosition.y - 0.1,
        frameWorldPosition.z,
        true
      );

      if (onFrameChange) {
        onFrameChange(index);
      }
    },
    [onFrameChange, frameRefs]
  );

  const resetCamera = useCallback(async () => {
    if (!cameraControlsRef.current) return;

    await cameraControlsRef.current.setLookAt(0, 2, 14, 0, 0, 0, true);

    if (onFrameChange) {
      onFrameChange(-1);
    }
  }, [onFrameChange]);

  useEffect(() => {
    if (currentFrameIndex >= 0 && currentFrameIndex < imagesCount) {
      zoomToFrame(currentFrameIndex);
    } else if (currentFrameIndex === -1) {
      resetCamera();
    }
  }, [currentFrameIndex, imagesCount, zoomToFrame, resetCamera]);

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        events={true}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
          wheel: 0,
        }}
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
      />
    </>
  );
};

export { CameraManager, type CameraManagerProps };

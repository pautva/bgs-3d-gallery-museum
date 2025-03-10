// SwipeableContainer.tsx
import React from "react";
import { useSwipeable } from "react-swipeable";

interface SwipeableContainerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeDown: () => void;
  enabled: boolean;
  children: React.ReactNode;
}

const SwipeableContainer: React.FC<SwipeableContainerProps> = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  enabled,
  children,
}) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: enabled ? onSwipeLeft : undefined,
    onSwipedRight: enabled ? onSwipeRight : undefined,
    onSwipedDown: enabled ? onSwipeDown : undefined,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    // Augmenter la sensibilité pour faciliter le swipe
    delta: 10,
    // Ajouter un délai pour éviter les swipes accidentels
    swipeDuration: 500,
  });

  return (
    <div {...swipeHandlers} className="absolute inset-0 w-full h-full z-10 ">
      {children}
    </div>
  );
};

export default SwipeableContainer;

import React, { useState } from "react";
import { Keyboard, Info } from "lucide-react";

const Controls: React.FC = () => {
  const [displaySettings, setDisplaySettings] = useState<
    "none" | "information" | "settings"
  >("none");

  return (
    <>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() =>
            setDisplaySettings((prev) =>
              prev === "information" ? "none" : "information"
            )
          }
          className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors"
        >
          <Info size={20} className="text-white" />
        </button>
        <button
          onClick={() =>
            setDisplaySettings((prev) =>
              prev === "settings" ? "none" : "settings"
            )
          }
          className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors"
        >
          <Keyboard size={20} className="text-white" />
        </button>
      </div>

      {displaySettings === "information" && (
        <div className="absolute bottom-20 right-4 bg-black/80 backdrop-blur-md p-4 rounded-lg text-white w-96">
          <h3 className="text-lg font-semibold mb-2">Information</h3>

          <p>
            Welcome to my interactive 3D museum! This project was created to
            showcase my drawings in an immersive way using Three.js and React.
          </p>
          <br />
          <p>Made by Tom Pastor</p>
        </div>
      )}

      {displaySettings === "settings" && (
        <div className="absolute bottom-20 right-4 bg-black/80 backdrop-blur-md p-4 rounded-lg text-white w-96">
          <h3 className="text-lg font-semibold mb-2">Controls</h3>

          <h5 className="font-semibold">Starting the Tour</h5>
          <ul className="text-sm">
            <li>• Click "Start the Tour" to view the first artwork.</li>
            <li>
              • Use the left (←) and right (→) arrow keys or the on-screen
              buttons to navigate between artworks.
            </li>
          </ul>
          <h5 className="mt-3 font-semibold">Exploring Freely</h5>
          <ul className="text-sm">
            <li>• Click on any artwork to display it directly.</li>
            <li>
              • From there, navigate using the arrow keys or buttons as in the
              guided tour.
            </li>
          </ul>

          <h5 className="mt-3 font-semibold">Exiting the Tour</h5>
          <ul className="text-sm">
            <li>
              • Press Esc or click on the displayed artwork to return to the
              beginning.
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Controls;

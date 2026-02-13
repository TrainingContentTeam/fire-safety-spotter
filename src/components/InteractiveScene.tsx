import { useState, useRef, useCallback } from "react";
import type { Hotspot } from "@/data/hotspots";
import { Check, X } from "lucide-react";

interface InteractiveSceneProps {
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
  foundIds: Set<string>;
  onHotspotClick: (id: string) => void;
}

const InteractiveScene = ({
  imageSrc,
  imageAlt,
  hotspots,
  foundIds,
  onHotspotClick,
}: InteractiveSceneProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (id: string) => {
      if (activeId === id) {
        setActiveId(null);
      } else {
        setActiveId(id);
        onHotspotClick(id);
      }
    },
    [activeId, onHotspotClick]
  );

  const activeHotspot = hotspots.find((h) => h.id === activeId);

  return (
    <div className="relative w-full" ref={containerRef}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-auto block rounded-lg"
        draggable={false}
      />

      {hotspots.map((hotspot) => {
        const isFound = foundIds.has(hotspot.id);
        const isActive = activeId === hotspot.id;

        return (
          <button
            key={hotspot.id}
            onClick={() => handleClick(hotspot.id)}
            className={`hotspot-marker absolute w-8 h-8 sm:w-10 sm:h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center z-10
              ${
                isFound
                  ? "found bg-success/80 border-success"
                  : "bg-primary/70 border-primary hover:bg-primary/90"
              }
              ${isActive ? "scale-125 z-20" : "hover:scale-110"}
            `}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            aria-label={`Inspect ${hotspot.label}`}
          >
            {isFound ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success-foreground" />
            ) : (
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary-foreground" />
            )}
          </button>
        );
      })}

      {/* Info popup */}
      {activeHotspot && (
        <div
          className="absolute z-30 bg-card border border-border rounded-lg shadow-2xl p-4 max-w-xs sm:max-w-sm w-[85vw] sm:w-auto"
          style={{
            left: `${Math.min(Math.max(activeHotspot.x, 20), 80)}%`,
            top: `${activeHotspot.y > 60 ? activeHotspot.y - 5 : activeHotspot.y + 8}%`,
            transform: `translateX(-50%) ${activeHotspot.y > 60 ? "translateY(-100%)" : ""}`,
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-primary text-sm sm:text-base mb-1">
                {activeHotspot.label}
              </h4>
              <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
            <button
              onClick={() => setActiveId(null)}
              className="shrink-0 p-1 rounded hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          {foundIds.has(activeHotspot.id) && (
            <div className="mt-2 flex items-center gap-1 text-success text-xs font-medium">
              <Check className="w-3 h-3" /> Inspected
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveScene;

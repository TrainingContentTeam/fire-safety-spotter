import { useState, useCallback, useRef, useEffect } from "react";
import { RotateCcw, ChevronRight, ChevronLeft, Shield, Flame } from "lucide-react";
import InteractiveScene from "@/components/InteractiveScene";
import { ppeHotspots, sceneHotspots } from "@/data/hotspots";
import firefighterImg from "@/assets/firefighter-ppe.jpg";
import fireSceneImg from "@/assets/fire-scene.jpg";

const PARTS = [
  {
    key: "ppe",
    title: "Part 1: PPE Gear Inspection",
    subtitle: "Tap each hotspot to inspect the firefighter's PPE gear",
    icon: Shield,
    hotspots: ppeHotspots,
    image: firefighterImg,
    imageAlt: "Firefighter in full PPE gear for inspection",
  },
  {
    key: "scene",
    title: "Part 2: Fire Scene Hazards",
    subtitle: "Identify all hazards at the fire scene",
    icon: Flame,
    hotspots: sceneHotspots,
    image: fireSceneImg,
    imageAlt: "Fire scene with multiple hazards to identify",
  },
] as const;

const SpotTheHazard = () => {
  const [currentPart, setCurrentPart] = useState(0);
  const [foundSets, setFoundSets] = useState<[Set<string>, Set<string>]>([
    new Set(),
    new Set(),
  ]);
  const completionSentRef = useRef(false);

  const part = PARTS[currentPart];
  const found = foundSets[currentPart];
  const totalAll = ppeHotspots.length + sceneHotspots.length;
  const foundAll = foundSets[0].size + foundSets[1].size;
  const allComplete = foundAll === totalAll;

  useEffect(() => {
    if (allComplete && !completionSentRef.current) {
      completionSentRef.current = true;
      try {
        window.parent.postMessage({ type: "complete" }, "*");
      } catch {
        // silently fail if not in iframe
      }
    }
  }, [allComplete]);

  const handleHotspotClick = useCallback(
    (id: string) => {
      setFoundSets((prev) => {
        const next = [...prev] as [Set<string>, Set<string>];
        next[currentPart] = new Set(prev[currentPart]).add(id);
        return next;
      });
    },
    [currentPart]
  );

  const handleRestart = () => {
    setCurrentPart(0);
    setFoundSets([new Set(), new Set()]);
    completionSentRef.current = false;
  };

  const partComplete = found.size === part.hotspots.length;
  const Icon = part.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-foreground leading-tight">
                Spot the Hazard
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Interactive Safety Training
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Global progress */}
            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="text-primary font-bold">{foundAll}</span>
              <span> / {totalAll}</span>
            </div>
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs sm:text-sm font-medium transition-colors"
              aria-label="Restart activity"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(foundAll / totalAll) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Part header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <div>
                <h2 className="text-sm sm:text-base font-bold text-foreground">
                  {part.title}
                </h2>
                <p className="text-xs text-muted-foreground">{part.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span
                className={`text-xs sm:text-sm font-bold ${
                  partComplete ? "text-success" : "text-primary"
                }`}
              >
                {found.size} / {part.hotspots.length}
              </span>
              {partComplete && (
                <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full font-medium">
                  ✓ Complete
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scene */}
        <div className="flex-1 px-2 sm:px-4 pb-4 max-w-5xl mx-auto w-full">
          <InteractiveScene
            imageSrc={part.image}
            imageAlt={part.imageAlt}
            hotspots={part.hotspots}
            foundIds={found}
            onHotspotClick={handleHotspotClick}
          />
        </div>

        {/* Navigation */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-border bg-card">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setCurrentPart(0)}
              disabled={currentPart === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">PPE Inspection</span>
              <span className="sm:hidden">Back</span>
            </button>

            {/* Part indicators */}
            <div className="flex gap-2">
              {PARTS.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setCurrentPart(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentPart
                      ? "bg-primary scale-125"
                      : foundSets[i].size === PARTS[i].hotspots.length
                      ? "bg-success"
                      : "bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to ${p.title}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPart(1)}
              disabled={currentPart === 1}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <span className="hidden sm:inline">Fire Scene</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Completion overlay */}
      {allComplete && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Activity Complete!
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6">
              You've successfully identified all PPE inspection points and fire
              scene hazards. Stay safe out there!
            </p>
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 mx-auto px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Restart Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotTheHazard;

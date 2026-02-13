export interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

export const ppeHotspots: Hotspot[] = [
  {
    id: "seams",
    label: "Seams & Stitching",
    description: "Check that all seams are intact and stitching is not frayed. Compromised seams can allow heat and contaminants to penetrate the garment.",
    x: 38,
    y: 45,
  },
  {
    id: "shell",
    label: "Shell Condition",
    description: "Inspect for rips, tears, or shell damage. Any damage compromises the thermal and physical protection of turnout gear.",
    x: 62,
    y: 50,
  },
  {
    id: "vapor-barrier",
    label: "Vapor Barrier",
    description: "Ensure the vapor barrier is intact and undamaged. This layer prevents steam, hot water, and chemicals from reaching the skin.",
    x: 55,
    y: 38,
  },
  {
    id: "closures",
    label: "Zippers, Velcro & Closures",
    description: "Verify all zippers, Velcro, and closures function properly. Failed closures can expose the firefighter to thermal hazards.",
    x: 48,
    y: 55,
  },
  {
    id: "helmet",
    label: "Helmet & Chin Strap",
    description: "Confirm helmet meets NFPA standard and chin strap is secured. The helmet protects against impact, heat, and falling debris.",
    x: 50,
    y: 8,
  },
  {
    id: "boots",
    label: "Boots",
    description: "Boots must be NFPA-compliant, undamaged, and have adequate tread. Proper boots protect against punctures, heat, and electrical hazards.",
    x: 45,
    y: 90,
  },
  {
    id: "gloves",
    label: "Gloves",
    description: "Gloves must be NFPA-compliant for structural firefighting with proper fit and no damage. They protect hands from burns, cuts, and punctures.",
    x: 30,
    y: 62,
  },
  {
    id: "facepiece",
    label: "SCBA Facepiece",
    description: "Ensure facepiece is properly fitted, lens is undamaged, and seal is intact with no dry rot, tears, or damage. A proper seal is critical for respiratory protection.",
    x: 50,
    y: 20,
  },
];

export const sceneHotspots: Hotspot[] = [
  {
    id: "apparatus",
    label: "Fire Apparatus",
    description: "The fire apparatus presents noise hazards from the engine and equipment, as well as vehicle movement and backing hazards. Always maintain situational awareness around apparatus.",
    x: 22,
    y: 50,
  },
  {
    id: "smoke",
    label: "Smoke",
    description: "Smoke presents serious inhalation hazards including toxic gases and particulates. Always use SCBA in smoke environments. Never remove respiratory protection in the hot zone.",
    x: 55,
    y: 15,
  },
  {
    id: "structure",
    label: "Involved Structure",
    description: "The area near the involved structure poses burn and injury risks including structural collapse, falling debris, and radiant heat. Always wear proper PPE and maintain a safe operating distance.",
    x: 72,
    y: 48,
  },
  {
    id: "hose",
    label: "Hose on Ground",
    description: "Charged and uncharged hose lines on the ground are significant trip hazards, especially in low visibility conditions. Be aware of hose placement and step over carefully.",
    x: 40,
    y: 82,
  },
];

import { zones, robot, type ZoneStatus } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const statusFill: Record<ZoneStatus, string> = {
  clear: "var(--surface)",
  watch: "var(--warn-soft)",
  alert: "var(--alert-soft)",
};
const statusStroke: Record<ZoneStatus, string> = {
  clear: "var(--line)",
  watch: "#e9c27a",
  alert: "#f1a39a",
};
const statusDot: Record<ZoneStatus, string> = {
  clear: "var(--ok)",
  watch: "var(--warn)",
  alert: "var(--alert)",
};

/** Top-down floor plan of the demo kitchen with Pyro's position and route. */
export function KitchenMap({ className, compact = false }: { className?: string; compact?: boolean }) {
  const route = "M 47 30 L 47 22 L 47 21 L 20 21 M 47 30 L 58 30 L 58 39 L 58 40";
  return (
    <svg
      viewBox="0 0 100 60"
      className={cn("w-full", className)}
      role="img"
      aria-label="Kitchen floor plan showing six stations and the robot's position in the center aisle"
    >
      <defs>
        <pattern id="tile" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(27,25,22,0.06)" strokeWidth="0.15" />
        </pattern>
        <radialGradient id="robotGlow">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0.5" y="0.5" width="99" height="59" rx="2.5" fill="#f8f6f2" stroke="var(--line)" strokeWidth="0.3" />
      <rect x="0.5" y="0.5" width="99" height="59" rx="2.5" fill="url(#tile)" />

      {/* Route */}
      <path d={route} fill="none" stroke="var(--ember)" strokeWidth="0.45" strokeDasharray="1 1.2" strokeLinecap="round" opacity="0.7" />

      {zones.map((z) => (
        <g key={z.id}>
          <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="1.6" fill={statusFill[z.status]} stroke={statusStroke[z.status]} strokeWidth="0.3" />
          <circle cx={z.x + 3} cy={z.y + 3.4} r="0.9" fill={statusDot[z.status]} />
          <text x={z.x + 5} y={z.y + 4.4} fontSize={compact ? 2.6 : 2.3} fontWeight="600" fill="var(--ink)" fontFamily="var(--font-geist-sans)">
            {z.name}
          </text>
          {!compact && (
            <text x={z.x + 3} y={z.y + z.h - 2.6} fontSize="1.7" fill="var(--ink-2)" fontFamily="var(--font-geist-sans)">
              {z.note.length > Math.floor(z.w * 1.05) ? z.note.slice(0, Math.floor(z.w * 1.05) - 1).trimEnd() + "…" : z.note}
            </text>
          )}
        </g>
      ))}

      {/* Dock */}
      <rect x="88" y="27" width="7" height="6" rx="1" fill="var(--surface)" stroke="var(--line)" strokeWidth="0.3" />
      <text x="91.5" y="31" fontSize="1.6" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--font-geist-mono)">DOCK</text>

      {/* Robot */}
      <g className="robot-ping">
        <circle cx={robot.position.x} cy={robot.position.y} r="6" fill="url(#robotGlow)" />
      </g>
      <circle cx={robot.position.x} cy={robot.position.y} r="2.2" fill="var(--ink)" />
      <circle cx={robot.position.x} cy={robot.position.y} r="0.8" fill="var(--ember)" />
    </svg>
  );
}

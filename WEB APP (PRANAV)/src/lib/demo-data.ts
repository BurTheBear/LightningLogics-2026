// Demo data for the shared dashboard. Nothing here is live yet:
// the robot, AI vision and assistant are not connected to the web app.

export type ZoneId = "grill" | "fryers" | "prep" | "dish" | "walkin" | "pass";
export type ZoneStatus = "clear" | "watch" | "alert";

export type Zone = {
  id: ZoneId;
  name: string;
  status: ZoneStatus;
  note: string;
  // Floor-plan rectangle in a 100 x 60 grid
  x: number;
  y: number;
  w: number;
  h: number;
};

export const zones: Zone[] = [
  { id: "grill", name: "Grill", status: "watch", note: "Flat-top at 260°C, smoke level normal", x: 4, y: 4, w: 30, h: 14 },
  { id: "fryers", name: "Fryers", status: "clear", note: "Oil spill cleared 7:42 pm", x: 36, y: 4, w: 22, h: 14 },
  { id: "prep", name: "Prep", status: "clear", note: "No events tonight", x: 60, y: 4, w: 36, h: 14 },
  { id: "pass", name: "Pass", status: "clear", note: "No events tonight", x: 4, y: 42, w: 40, h: 14 },
  { id: "dish", name: "Dish", status: "clear", note: "Floor damp, below mop threshold", x: 46, y: 42, w: 24, h: 14 },
  { id: "walkin", name: "Walk-in", status: "clear", note: "Door closed", x: 72, y: 42, w: 24, h: 14 },
];

export const robot = {
  name: "Pyro",
  model: "PyroBot P1",
  state: "Patrolling",
  battery: 82,
  water: 64, // percent of tank
  mopPad: "Fresh",
  position: { x: 47, y: 30 },
  lastSeen: "just now",
};

export type IncidentKind = "Fire" | "Smoke" | "Spill";
export type Incident = {
  id: string;
  time: string;
  day: string;
  kind: IncidentKind;
  zone: string;
  action: string;
  confirmedBy: string;
  confidence: number;
  status: "Resolved" | "Watching" | "Dismissed";
};

export const incidents: Incident[] = [
  { id: "INC-1042", time: "7:42 pm", day: "Today", kind: "Spill", zone: "Fryers", action: "Mopped, 1 pass", confirmedBy: "Auto (mop)", confidence: 0.94, status: "Resolved" },
  { id: "INC-1041", time: "7:18 pm", day: "Today", kind: "Smoke", zone: "Grill", action: "Alert sent to grill station", confirmedBy: "Marco R.", confidence: 0.71, status: "Watching" },
  { id: "INC-1040", time: "6:05 pm", day: "Today", kind: "Fire", zone: "Grill", action: "Water burst, 2 s", confirmedBy: "Dana K.", confidence: 0.97, status: "Resolved" },
  { id: "INC-1039", time: "9:51 pm", day: "Yesterday", kind: "Spill", zone: "Dish", action: "Mopped, 2 passes", confirmedBy: "Auto (mop)", confidence: 0.9, status: "Resolved" },
  { id: "INC-1038", time: "8:27 pm", day: "Yesterday", kind: "Spill", zone: "Pass", action: "Dismissed — sauce on a plate, not the floor", confirmedBy: "Dana K.", confidence: 0.58, status: "Dismissed" },
  { id: "INC-1037", time: "12:14 pm", day: "Tue", kind: "Smoke", zone: "Fryers", action: "Alert sent to fryer station", confirmedBy: "Leo T.", confidence: 0.66, status: "Resolved" },
];

export const team = [
  { name: "Dana Kowalski", role: "Supervisor", station: "All stations" },
  { name: "Marco Ruiz", role: "Chef", station: "Grill" },
  { name: "Leo Tran", role: "Chef", station: "Fryers" },
  { name: "Priya Shah", role: "Chef", station: "Prep" },
];

export const currentUser = { firstName: "Dana", role: "Supervisor" as const };

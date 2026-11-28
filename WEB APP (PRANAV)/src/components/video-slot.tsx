import fs from "node:fs";
import path from "node:path";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Plays /public/videos/<file> once it is added (Shreyansh's demo video).
 * Until then it shows a finished-looking empty frame that says where the file goes.
 */
export function VideoSlot({ file, label, className }: { file: string; label: string; className?: string }) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "videos", file));
  return (
    <div className={cn("relative overflow-hidden bg-[#0b0d11]", className)}>
      {exists ? (
        <video src={`/videos/${file}`} controls playsInline preload="metadata" aria-label={label} className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/60">
          <span className="grid size-16 place-items-center rounded-full border border-white/20 bg-white/5">
            <Play className="ml-1 size-6" />
          </span>
          <span className="text-[14px] text-white/70">{label}</span>
          <span className="font-mono text-[11px] text-white/40">public/videos/{file}</span>
        </div>
      )}
    </div>
  );
}

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shows /public/images/<file> when it exists. Until the photo is added it
 * renders a quiet stand-in so the layout never collapses.
 * Generated photos for these slots live in the team's ElevenLabs flow
 * ("PyroBot landing images") — download and drop them into public/images.
 */
export function PhotoSlot({
  file,
  alt,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  file: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "images", file));

  return (
    <div className={cn("group/photo relative overflow-hidden bg-[#e7e2da]", className)}>
      {exists ? (
        <Image
          src={`/images/${file}`}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover/photo:scale-[1.02]"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-3"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0 14px, rgba(27,25,22,0.035) 14px 15px)",
          }}
        >
          <ImageIcon className="size-5" strokeWidth={1.5} />
          <span className="font-mono text-[11px] tracking-tight">public/images/{file}</span>
        </div>
      )}
    </div>
  );
}

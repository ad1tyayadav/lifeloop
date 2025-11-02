"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  videoSrc: string;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function VideoModal({
  videoSrc,
  className,
  isOpen,
  onClose,
}: VideoModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;
  const close = onClose ?? (() => setInternalOpen(false));

  if (!open) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm", className)}>
      {/* Close Button */}
      <button
        onClick={close}
        className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-all duration-200"
        aria-label="Close video"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Video Player */}
      <div className="relative w-full max-w-5xl mx-4 overflow-hidden rounded-2xl shadow-2xl">
        <video
          key={videoSrc} // ensures it restarts on reopen
          controls
          autoPlay
          className="aspect-video w-full bg-black rounded-2xl"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

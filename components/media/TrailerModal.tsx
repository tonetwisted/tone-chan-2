"use client";

import Modal from "@/components/ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  videoUrl?: string;        // YouTube embed URL or direct video URL
  videoType?: "youtube" | "file";
}

export default function TrailerModal({
  open,
  onClose,
  videoUrl = "",
  videoType = "youtube",
}: Props) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-4xl">
      <div className="p-2">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          {videoType === "youtube" && videoUrl ? (
            <iframe
              src={videoUrl}
              title="Tone Chan's Adventures — Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-xl"
            />
          ) : videoUrl ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full rounded-xl object-cover"
            />
          ) : (
            /* Placeholder when no video is set */
            <div className="absolute inset-0 rounded-xl bg-tc-dark flex flex-col items-center justify-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FF006E, #7B2FBE)" }}
              >
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-pixel text-[10px] text-tc-cream mb-2">TRAILER COMING SOON</p>
                <p className="text-tc-cream/40 text-sm">Set <code>videoUrl</code> in TrailerModal</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

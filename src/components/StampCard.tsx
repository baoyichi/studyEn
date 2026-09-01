import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { Stamp } from "../types";
import { stampSize } from "../features/stamps/layout";
import { ImagePreview } from "./ImagePreview";

type Props = {
  stamp: Stamp;
  selected?: boolean;
  onSelect: () => void;
  onLongPress?: () => void;
};

export function StampCard({ stamp, selected, onSelect, onLongPress }: Props) {
  const size = stampSize(stamp.orientation);
  const longPressTimer = useRef<number | undefined>(undefined);
  const pointerStart = useRef<{ x: number; y: number } | undefined>(undefined);

  function clearLongPress() {
    if (longPressTimer.current !== undefined)
      window.clearTimeout(longPressTimer.current);
    longPressTimer.current = undefined;
  }

  function startLongPress(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!onLongPress) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    longPressTimer.current = window.setTimeout(() => {
      longPressTimer.current = undefined;
      onLongPress();
    }, 500);
  }

  function cancelLongPressOnMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!pointerStart.current) return;
    const distance = Math.hypot(
      event.clientX - pointerStart.current.x,
      event.clientY - pointerStart.current.y,
    );
    if (distance > 5) clearLongPress();
  }

  return (
    <div className="stamp-group">
      <button
        className={`stamp-card ${selected ? "is-selected" : ""}`}
        style={{ aspectRatio: `${size.width} / ${size.height}` }}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        onPointerDown={startLongPress}
        onPointerMove={cancelLongPressOnMove}
        onPointerUp={clearLongPress}
        onPointerCancel={clearLongPress}
        aria-label={`${stamp.location}，${stamp.date}`}
      >
        <span className="stamp-card__perforation">
          <ImagePreview blob={stamp.imageBlob} alt={stamp.location} />
        </span>
        <span className="stamp-card__caption">
          <b>{stamp.location}</b>
          <small>{stamp.date}</small>
        </span>
      </button>
      {stamp.note && (
        <>
          <svg
            className="stamp-note-leader"
            viewBox="0 0 64 58"
            aria-hidden="true"
          >
            <path d="M4 4 C25 8 36 18 34 29 C32 39 10 37 12 25 C14 14 35 22 43 35 C52 48 45 56 60 57" />
          </svg>
          <p className="stamp-note">{stamp.note.slice(0, 35)}</p>
        </>
      )}
    </div>
  );
}

import type { Stamp, StampOrientation } from "../../types";

const slots: Record<StampOrientation, { width: number; height: number }> = {
  landscape: { width: 38, height: 27 },
  portrait: { width: 28, height: 39 },
  square: { width: 31, height: 31 },
};

export const stampSize = (orientation: StampOrientation) => slots[orientation];

export function suggestedPosition(
  index: number,
  orientation: StampOrientation,
) {
  const patterns = [
    { x: 12, y: 21, rotation: -4 },
    { x: 55, y: 16, rotation: 3 },
    { x: 18, y: 57, rotation: 2 },
    { x: 57, y: 53, rotation: -3 },
    { x: 37, y: 35, rotation: 1 },
  ];
  const item = patterns[index % patterns.length];
  const size = stampSize(orientation);
  return {
    ...item,
    x: Math.min(item.x, 96 - size.width),
    y: Math.min(item.y, 94 - size.height),
  };
}

export function arrangeStamps(stamps: Stamp[]) {
  return stamps.map((stamp, index) => {
    const spot = suggestedPosition(index, stamp.orientation);
    return { ...stamp, ...spot, zIndex: index + 1 };
  });
}

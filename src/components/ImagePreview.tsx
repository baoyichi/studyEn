import { useEffect, useMemo } from "react";

type Props = {
  blob: Blob;
  alt: string;
  className?: string;
};

/** Safely renders browser-owned Blob URLs and releases them on unmount. */
export function ImagePreview({ blob, alt, className = "" }: Props) {
  const source = useMemo(() => URL.createObjectURL(blob), [blob]);

  useEffect(() => () => URL.revokeObjectURL(source), [source]);

  return <img className={className} src={source} alt={alt} />;
}

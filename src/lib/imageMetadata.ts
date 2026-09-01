import * as exifr from "exifr";

export type ImageMetadata = {
  /** Date recorded by the camera, formatted for a date input. */
  date?: string;
  /** A human-readable location resolved from EXIF GPS coordinates. */
  location?: string;
};

/**
 * Reads photo metadata in the browser. GPS lookup is best-effort: many
 * messaging apps remove EXIF data, and the user can always edit the result.
 */
export async function readImageMetadata(file: File): Promise<ImageMetadata> {
  const metadata = await exifr.parse(file, {
    gps: true,
    pick: ["DateTimeOriginal", "CreateDate", "latitude", "longitude"],
  });

  const date = toInputDate(metadata?.DateTimeOriginal ?? metadata?.CreateDate);
  const location = await reverseGeocode(
    metadata?.latitude,
    metadata?.longitude,
  );

  return { date, location };
}

function toInputDate(value: unknown): string | undefined {
  if (!(value instanceof Date) || Number.isNaN(value.valueOf()))
    return undefined;
  return value.toISOString().slice(0, 10);
}

/**
 * Nominatim is used directly only for this browser-only MVP. A production
 * release should proxy and cache this request through its own backend.
 */
async function reverseGeocode(
  latitude?: number,
  longitude?: number,
): Promise<string | undefined> {
  if (typeof latitude !== "number" || typeof longitude !== "number")
    return undefined;

  try {
    const params = new URLSearchParams({
      format: "jsonv2",
      lat: String(latitude),
      lon: String(longitude),
      zoom: "10",
    });
    const response = await fetch(
      "https://nominatim.openstreetmap.org/reverse?" + params,
    );
    if (!response.ok) return undefined;
    const result = (await response.json()) as {
      address?: Record<string, string>;
    };
    const address = result.address;
    if (!address) return undefined;

    return [
      address.country,
      address.state,
      address.city ?? address.town ?? address.village,
    ]
      .filter(Boolean)
      .join(" · ");
  } catch {
    return undefined;
  }
}

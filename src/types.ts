export type StampOrientation = "landscape" | "portrait" | "square";

export type Trip = {
  id: string;
  countryOrRegion: string;
  startDate: string;
  endDate: string;
  /** Optional only to keep notebooks made by the first MVP readable. */
  coverImageBlob?: Blob;
  createdAt: string;
  stampIds: string[];
};

export type Stamp = {
  id: string;
  tripId: string;
  imageBlob: Blob;
  orientation: StampOrientation;
  location: string;
  date: string;
  note: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  createdAt: string;
};

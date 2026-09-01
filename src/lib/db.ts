import { openDB } from "idb";
import type { Stamp, Trip } from "../types";

const db = openDB("travel-notes", 1, {
  upgrade(database) {
    const trips = database.createObjectStore("trips", { keyPath: "id" });
    trips.createIndex("createdAt", "createdAt");
    const stamps = database.createObjectStore("stamps", { keyPath: "id" });
    stamps.createIndex("tripId", "tripId");
  },
});

export const travelDb = {
  async getTrips() {
    return (await db).getAll("trips") as Promise<Trip[]>;
  },
  async getTrip(id: string) {
    return (await db).get("trips", id) as Promise<Trip | undefined>;
  },
  async saveTrip(trip: Trip) {
    await (await db).put("trips", trip);
  },
  async deleteTrip(id: string) {
    await (await db).delete("trips", id);
  },
  async getStamps(tripId: string) {
    return (await db).getAllFromIndex("stamps", "tripId", tripId) as Promise<
      Stamp[]
    >;
  },
  async saveStamp(stamp: Stamp) {
    await (await db).put("stamps", stamp);
  },
  async deleteStamp(id: string) {
    await (await db).delete("stamps", id);
  },
};

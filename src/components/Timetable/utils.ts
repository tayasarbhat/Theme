/**
 * Generates a unique identifier for timetable items
 * @returns A unique string ID
 */
export function generateUniqueId(): string {
  return crypto.randomUUID();
}
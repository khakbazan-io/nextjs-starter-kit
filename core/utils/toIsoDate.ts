/**
 * Converts a given **date** into an **ISO 8601 formatted string**.
 *
 * Supports **Date objects, Unix timestamps, and valid date strings**.
 *
 * @param {Date | number | string} date - The date to convert (Date object, timestamp, or string).
 * @returns {string} The formatted ISO date string (`YYYY-MM-DDTHH:mm:ss.sssZ`).
 * @throws {Error} Throws an error if the input is not a valid date.
 */
export function toIsoDate(date: Date | number | string): string {
  if (date instanceof Date) {
    return date.toISOString(); // Directly convert Date object to ISO string
  }

  if (typeof date === "number") {
    return new Date(date).toISOString(); // Convert Unix timestamp to ISO string
  }

  if (typeof date === "string") {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString(); // Convert valid date string to ISO string
    } else {
      throw new Error("Invalid date string format"); // Handle invalid date string
    }
  }

  throw new Error("Invalid date format"); // Handle unsupported input types
}

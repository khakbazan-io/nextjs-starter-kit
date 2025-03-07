import moment from "jalali-moment";

/**
 * Adds a leading zero to single-digit numbers to ensure two-digit formatting.
 *
 * @param {number} digit - The number to be formatted.
 * @returns {string | number} The formatted number as a string if it's a single digit, otherwise returns the number itself.
 */
export const zeroFill = (digit: number): string | number =>
  digit > 9 ? digit : `0${digit}`;

/**
 * Formats a given date value into a readable **Jalali (Persian) date** format.
 *
 * - Supports multiple input formats:
 *   - **Date object**
 *   - **String (ISO, UTC, or "YYYY-MM-DD" format)**
 *   - **Unix Timestamp (milliseconds)**
 *
 * @param {any} value - The date input to format (Date object, string, or timestamp).
 * @param {boolean} [showTime=true] - Whether to include the time in the output.
 * @returns {string} The formatted Jalali date (optionally with time) or `"-"` if the input is invalid.
 */
export function formatDate(value: any, showTime = true): string {
  let date: Date;

  if (value instanceof Date) {
    // Input is a Date object
    date = value;
  } else if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      // Input is a simple date string (e.g., "2024-12-21")
      date = new Date(value + "T00:00:00");
    } else if (!isNaN(Date.parse(value))) {
      if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,})?$/.test(value)) {
        // If input is a UTC ISO string missing the "Z" at the end (e.g., "2024-12-21T00:00:00")
        date = new Date(value + "Z");
      } else {
        // Input is a fully valid UTC ISO string (e.g., "2024-12-21T00:00:00Z")
        date = new Date(value);
      }
    } else {
      return "-"; // Invalid date string
    }
  } else if (typeof value === "number") {
    // Input is a Unix Timestamp (milliseconds, e.g., 1672531200000)
    date = new Date(value);
  } else {
    return "-"; // Unsupported type
  }

  // Validate the parsed date
  if (isNaN(date.getTime())) {
    return "-";
  }

  // Convert to **Jalali date format** using **moment-jalali**
  const jalaliMoment = moment(date).locale("fa");
  const jalaliDate = jalaliMoment.format("YYYY/MM/DD");

  if (!showTime) {
    return jalaliDate; // Return date without time
  }

  // Include **time formatting** if `showTime` is enabled
  const hour = zeroFill(date.getHours());
  const minute = zeroFill(date.getMinutes());

  return `${hour}:${minute} ${jalaliDate}`;
}

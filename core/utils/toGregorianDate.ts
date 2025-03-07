import moment from "jalali-moment";

/**
 * Converts a **Jalali (Persian) date** string to a **Gregorian (ISO format) date**.
 *
 * @param {string} date - The Jalali date in `YYYY-MM-DD` format.
 * @returns {string} The converted **Gregorian date (YYYY-MM-DD)** or `"-"` if invalid.
 */
export const toGregorianDate = (date: string): string => {
  // Ensure the input is a valid Jalali date before converting
  if (moment.from(date, "YYYY-MM-DD").locale("fa").isValid()) {
    return moment.from(date, "fa", "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  return "-"; // Return fallback value if the input date is invalid
};

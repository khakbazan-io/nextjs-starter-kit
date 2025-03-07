/**
 * Converts a duration in milliseconds into a formatted time object (HH:MM:SS).
 *
 * @param {number} millisecond - The duration in milliseconds.
 * @returns {Object} An object containing the formatted time:
 * - `hours`: Hours formatted as a two-digit string.
 * - `minutes`: Minutes formatted as a two-digit string.
 * - `seconds`: Seconds formatted as a two-digit string.
 */
export const millisecondToTime = (millisecond: number) => {
  // Convert milliseconds to total seconds
  let seconds = Math.floor(millisecond / 1000);
  // Convert total seconds to total minutes
  let minutes = Math.floor(seconds / 60);
  // Convert total minutes to hours
  const hours = Math.floor(minutes / 60);

  // Get remaining seconds after extracting minutes
  seconds = seconds % 60;
  // Get remaining minutes after extracting hours
  minutes = minutes % 60;

  return {
    hours: hours.toString().padStart(2, "0"), // Ensures two-digit formatting
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

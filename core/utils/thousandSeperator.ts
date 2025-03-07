/**
 * Formats a number with a **thousands separator (`,` by default)**
 * and an optional **prefix (e.g., currency symbol or unit)**.
 *
 * @param {number | string | undefined} value - The number to format.
 * @param {string} [prefix] - Optional prefix to append (e.g., currency unit).
 * @returns {string} The formatted number with thousands separators and optional prefix.
 */
export function thousandSeperator(
  value: number | string | undefined,
  prefix?: string
): string {
  if (value === undefined || value === null || value === "") {
    return `0 ${prefix ?? ""}`.trim();
  }

  // Ensure value is a string before applying formatting
  const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return prefix ? `${formattedValue} ${prefix}` : formattedValue;
}

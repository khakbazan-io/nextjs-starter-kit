/**
 * Joins an array of strings, filtering out `undefined` values.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<string | undefined>} params.data - The array of strings to join.
 * @param {string} [params.separator=" "] - The separator used to join the strings (default: space).
 * @returns {string} A single concatenated string with the specified separator.
 */
export function joinStrings({
  data,
  separator = " ",
}: {
  data: Array<string | undefined>;
  separator?: string;
}): string {
  return data.filter(Boolean).join(separator);
}

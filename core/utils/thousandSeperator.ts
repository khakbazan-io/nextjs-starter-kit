export function thousandSeperator(
  value: number | string | undefined,
  prefix?: string
) {
  if (!value) {
    return `0 ${prefix ?? ""}`;
  }

  return prefix
    ? `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${prefix ?? ""}`
    : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

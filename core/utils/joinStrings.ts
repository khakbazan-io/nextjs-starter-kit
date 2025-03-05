export function joinStrings({
  data,
  seperator = " ",
}: {
  data: Array<string | undefined>;
  seperator?: string;
}) {
  return data.filter(Boolean).join(seperator);
}

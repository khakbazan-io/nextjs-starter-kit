export function toIsoDate(date: Date | number | string): string {
  if (date instanceof Date) {
    return date.toISOString();
  }

  if (typeof date === "number") {
    return new Date(date).toISOString();
  }

  if (typeof date === "string") {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString();
    } else {
      throw new Error("Invalid date string format");
    }
  }

  throw new Error("Invalid date format");
}

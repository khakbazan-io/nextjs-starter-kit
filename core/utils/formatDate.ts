import moment from "jalali-moment";

export const zeroFill = (digit: number) => (digit > 9 ? digit : `0${digit}`);

export function formatDate(value: any, showTime = true): string {
  let date;

  if (value instanceof Date) {
    // Input is a Date object
    date = value;
  } else if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      // Input is a simple date string (e.g., "2024-12-21")
      date = new Date(value + "T00:00:00");
    } else if (!isNaN(Date.parse(value))) {
      if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,})?$/.test(value)) {
        // if input is UTC ISO string but Z is missed in the end of it e.g., "2024-12-21T00:00:00")
        date = new Date(value + "Z");
      } else {
        // Input is a UTC ISO string (e.g., "2024-12-21T00:00:00Z")
        date = new Date(value);
      }
    } else {
      return "-"; // Invalid string
    }
  } else if (typeof value === "number") {
    // Input is a Unix Timestamp (e.g., 1672531200000)
    date = new Date(value);
  } else {
    return "-"; // Unsupported type
  }

  // Validate the parsed date
  if (isNaN(date.getTime())) {
    return "-";
  }

  // Format to Jalali
  const jalaliMoment = moment(date).locale("fa");
  const jalaliDate = jalaliMoment.format("YYYY/MM/DD");

  if (!showTime) {
    return jalaliDate;
  }

  // Include time if needed
  const hour = zeroFill(date.getHours());
  const minute = zeroFill(date.getMinutes());

  return `${hour}:${minute} ${jalaliDate}`;
}

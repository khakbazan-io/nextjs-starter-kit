import moment from "jalali-moment";

export const toGregorianDate = (date: string) => {
  if (moment.from(date, "YYYY-MM-DD").locale("fa").isValid()) {
    return moment.from(date, "fa", "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  return "-";
};

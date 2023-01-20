import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf("year");

  const today = new Date();

  const dates = [];

  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(firstDayOfTheYear.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}

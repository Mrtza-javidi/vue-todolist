export function createdDate() {
  return new Date().toISOString();
}

export function convertToPersianDate(isoDate) {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

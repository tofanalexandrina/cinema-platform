import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(
  startDate: Date | string | undefined,
  endDate: Date | string | undefined
): string {
  if (!startDate || !endDate) {
    return "Data evenimentului nu este setată";
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const startMonth = start
    .toLocaleDateString("ro-RO", { month: "long" })
    .toUpperCase();
  const endDay = end.getDate();
  const endMonth = end.toLocaleDateString("ro-RO", { month: "long" }).toUpperCase();
  const year = end.getFullYear();

  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
}

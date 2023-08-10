import { Dayjs } from 'dayjs';

export function standardDateFormat(
  date?: string | Date | Dayjs | null
): string {
  if (!date) {
    return '';
  } else if (typeof date === 'string' || date instanceof Date) {
    const dateObject: Date = typeof date === 'string' ? new Date(date) : date;
    return dateObject?.toDateString() ?? '';
  } else {
    return date.date().toString();
  }
}
export function standardDateTimeFormat(date: string | Date | Dayjs): string {
  if (!date) {
    return '';
  } else if (typeof date === 'string' || date instanceof Date) {
    const dateObject: Date = typeof date === 'string' ? new Date(date) : date;
    return `${dateObject.toDateString()} ${dateObject.toLocaleTimeString()}`;
  } else {
    return `${date.format('ddd MMM DD YYYY HH:mm A')}`;
  }
}

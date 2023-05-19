export function standardDateFormat(date: string | Date): string {
  const dateObject: Date = typeof date === 'string' ? new Date(date) : date;

  return dateObject.toDateString();
}

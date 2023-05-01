export function standardDateFormat(dateString: string): string {
    return new Date(dateString).toDateString();
}
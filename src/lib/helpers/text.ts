export function formatDate(date: Date, locale: string): string {
	return date.toLocaleDateString(locale, {
		...(date.getFullYear() !== new Date().getFullYear() && { year: 'numeric' }),
		month: 'long',
		day: 'numeric'
	});
}

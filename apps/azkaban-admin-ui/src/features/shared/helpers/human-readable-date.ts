import { format, formatDistance } from 'date-fns';

export function PrettyDates(date: Date): string {
	return format(date, 'dd.MM.yyyy');
}

export function PrettyDateDistance(date: Date): string {
	return formatDistance(date, new Date());
}

export function PrettyDateDistanceReversed(date: Date): string {
	return formatDistance(new Date(), date);
}

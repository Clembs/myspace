import { dateToSnowflake } from '@purplet/utils';

export function generateSnowflake(date: Date = new Date()) {
	return dateToSnowflake(date, 1704067200);
}

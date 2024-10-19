import { snowflakeToDate as purpletSnowToDate, dateToSnowflake } from '@purplet/utils';

export function generateSnowflake(date: Date = new Date()): string {
	return dateToSnowflake(date, 1704067200);
}

export function snowflakeToDate(snowflake: string): Date {
	return purpletSnowToDate(snowflake, 1704067200);
}

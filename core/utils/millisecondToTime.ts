export const millisecondToTime = (millisecond: number) => {
	let seconds = Math.floor(millisecond / 1000);
	let minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = minutes % 60;

	return {
		hours: hours.toString().padStart(2, "0"),
		minutes: minutes.toString().padStart(2, "0"),
		seconds: seconds.toString().padStart(2, "0"),
	};
};

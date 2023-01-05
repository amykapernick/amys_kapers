import { isSameMonth, setDate, getDay, getDate, getMonth, parseISO, getYear } from 'date-fns'

const parseEvents = (allEvents) => {
	const events = []

	allEvents.forEach(event => {
		let icon = false;
		switch (event.status) {
			case "cancelled":
				icon = "❌";
				break;
			case "moved":
				icon = "➡";
				break;
			case "online":
				icon = "🌐";
				break;
		}

		const start = parseISO(event?.dates?.start)
		const end = event?.dates?.end ? parseISO(event?.dates?.end) : start
		const setGrid = ({ start: s, end: e = s }) => {
			const data = {
				offset: getDay(setDate(s, 1)) + getDate(s),
				length: getDate(e) - getDate(s) + 1,
				row: getMonth(s) + 1,
				year: getYear(s)
			}

			return data
		}

		const eventData = {
			...event,
			icon,
			start,
			end
		}

		if (!isSameMonth(start, end)) {
			const dates = [
				{
					start: start,
					end: setDate(end, 0)
				},
				{
					start: setDate(end, 1),
					end: end
				},
			]

			events.push(...[
				{
					...eventData,
					...dates[0],
					...setGrid({ ...dates[0] })
				},
				{
					...eventData,
					...dates[1],
					...setGrid({ ...dates[1] })
				}
			])
		}
		else {
			events.push({
				...eventData,
				...setGrid({ start, end })
			})
		}
	})

	return events
}

export default parseEvents
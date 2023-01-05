import { isSameMonth, setDate, getDay, getDate, getMonth, parseISO, getYear } from 'date-fns'

const parseTrips = (allTrips) => {
	const trips = []

	allTrips.forEach(trip => {
		const start = parseISO(trip?.dates?.start)
		const end = trip?.dates?.end ? parseISO(trip?.dates?.end) : start
		const setGrid = ({ start: s, end: e = s }) => {
			const data = {
				offset: getDay(setDate(s, 1)) + getDate(s),
				length: getDate(e) - getDate(s) + 1,
				row: getMonth(s) + 1,
				year: getYear(s)
			}

			return data
		}

		const tripData = {
			...trip,
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

			trips.push(...[
				{
					...tripData,
					...dates[0],
					...setGrid({ ...dates[0] })
				},
				{
					...tripData,
					...dates[1],
					...setGrid({ ...dates[1] })
				}
			])
		}
		else {
			trips.push({
				...tripData,
				...setGrid({ start, end })
			})
		}
	})

	return trips
}

export default parseTrips
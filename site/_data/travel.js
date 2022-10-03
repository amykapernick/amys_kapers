const fetch = require("@11ty/eleventy-fetch");
const { isSameMonth, setDate, getYear, getDay, getDate, getMonth, parseISO } = require('date-fns');

module.exports = async () => {

	return fetch(`${process.env.SITE_URL}${process.env.API_URL}/travel?filter=all`, {
		duration: "1m",
		type: "json"
	}).then(res => {
		let allTrips = []
		const trips = []

		allTrips = res || []

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
						...trip,
						...dates[0],
						...setGrid({ ...dates[0] })
					},
					{
						...trip,
						...dates[1],
						...setGrid({ ...dates[1] })
					}
				])
			}
			else {
				trips.push({
					...trip,
					...setGrid({ start, end })
				})
			}
		})

		return trips
	}).catch(err => {
		console.log({ err })
	})
}
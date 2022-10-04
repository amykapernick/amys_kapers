const fetch = require("@11ty/eleventy-fetch");
const { isSameMonth, setDate, getDay, getDate, getMonth, parseISO, getYear } = require('date-fns');

module.exports = async () => {
	let url = `${process.env.API_URL}/events?filter=all`

	if (!url.includes('http')) {
		url = `${process.env.SITE_URL}${url}`
	}


	return fetch(url, {
		duration: "1m",
		type: "json"
	}).then(res => {
		let allEvents = []
		const events = []

		allEvents = res || []

		allEvents.forEach(event => {
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
						...event,
						...dates[0],
						...setGrid({ ...dates[0] })
					},
					{
						...event,
						...dates[1],
						...setGrid({ ...dates[1] })
					}
				])
			}
			else {
				events.push({
					...event,
					...setGrid({ start, end })
				})
			}
		})

		return events
	}).catch(err => {
		console.log({ err })
	})
}
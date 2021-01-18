const travel = [],
events = [
	{
		start: '2021-8-14',
		name: 'DDD Perth',
		type: 'organising',
	},
	{
		start: '2020-12-30',
		end: '2020-12-29',
		name: 'Current Conference',
		type: 'organising',
	},
],
months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]

if (typeof document !== 'undefined') {
	let city = 'Perth',
		country = 'Australia',
		currentTrip = '',
		conf,
		tripList,
		confList,
		away = false,
		atConf = false

	document.addEventListener('DOMContentLoaded', () => {
		const section = document.querySelector('#where'),
			location = section.querySelector('.location'),
			conference = section.querySelector('.conference'),
			trips = section.querySelector('.trips'),
			conferences = section.querySelector('.conferences'),
			today = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`),
			futureTrips = travel.filter(trip => {
				const startDate = new Date(trip.start),
				start = new Date(`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`)

				if(trip.end) {
					const endDate = new Date(trip.end),
					end = new Date(`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`)

					if(today >= start && today <= end) {
						away = true
						city = trip.city
						country = trip.country || 'Australia'
						currentTrip = `(${start.getDate()} ${start.getMonth()}) - (${end.getDate()} ${end.getMonth()})`
					}

					return today <= end
				}

				if(today == start) {
					away = true
					city = trip.city
					country = trip.country || 'Australia'
					currentTrip = `(${start.getDate()} ${start.getMonth()})`
				}

				return today <= start
			})
			futureEvents = events.filter(event => {
				const startDate = new Date(event.start),
				start = new Date(`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`)

				if(event.end) {
					const endDate = new Date(event.end),
					end = new Date(`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`)

					if(today >= start && today <= end) {
						atConf = true
						conf = `at ${event.name}`
					}

					return today <= end
				}

				if(today == start) {
					atConf = true
					conf = `at ${event.name}`
				}

				return today <= start
			})
	
	
		tripList = futureTrips.map(trip => {
			const startDate = new Date(trip.start),
				start = `${startDate.getDate()} ${months[startDate.getMonth()]}`,
				country = trip.country || 'Australia',
				classes = country.toLowerCase().replace(' ', '-')

			let end = ''

			if(trip.end) {
				const endDate = new Date(trip.end)
				end = ` - ${endDate.getDate()} ${months[endDate.getMonth()]}`
			}
	
			return `<li class="${classes}">${trip.city}, ${country}: ${start}${end}</li>`
		})
	
		confList = futureEvents.map(event => {
			const startDate = new Date(event.start),
				start = `${startDate.getDate()} ${months[startDate.getMonth()]}`,
				name = event.name,
				classes = event.type

			let end = ''

			if(event.end) {
				const endDate = new Date(event.end)
				end = ` - ${endDate.getDate()} ${months[endDate.getMonth()]}`
			}
	
			return `<li class="${classes}">${name}: ${start}${end}</li>`
		})
	
		let countryClass = country.toLowerCase().replace(' ', '-')

		if(futureTrips.length) {
			trips.innerHTML = `<ul>${tripList.join('')}</ul>`
		}
		else {
			trips.innerHTML = `<p>🤣, not any time soon</p>`
		}

		if(futureEvents.length) {
			conferences.innerHTML = `<ul>${confList.join('')}</ul>`
		}
		else {
			conferences.innerHTML = `<p>Be right back, taking a much needed break</p>`
		}
	
		location.innerHTML = `${city}, ${country} ${currentTrip}`
		location.classList.add(countryClass)
		conference.innerHTML = conf ? conf : ''
	})
}
	
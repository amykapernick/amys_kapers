const travel = [

	],
	events = [
		{
			start: '2020-03-26',
			end: '2020-03-27',
			name: 'WFH Conf',
			type: 'speaking',
		},
		{
			start: '2020-04-08',
			name: 'Global AI Community on Virtual Tour',
			type: 'speaking',
		},
		{
			start: '2020-04-23',
			end: '2020-04-24',
			name: 'NDC Porto',
			type: 'speaking',
		},
		{
			start: '2020-06-08',
			end: '2020-06-12',
			name: 'NDC Oslo',
			type: 'speaking',
		},
		{
			start: '2020-08-01',
			name: 'DDD Perth',
			type: 'organising',
		},
		{
			start: '2020-09-07',
			end: '2020-09-08',
			name: 'YOW! Perth',
			type: 'organising',
		},
		{
			start: '2020-09-29',
			end: '2020-10-01',
			name: 'Twilio Signal',
			type: 'speaking',
		},
	]

if (typeof document !== 'undefined') {
	document.addEventListener('DOMContentLoaded', () => {
		const section = document.querySelector('#where'),
			location = section.querySelector('.location'),
			conference = section.querySelector('.conference'),
			trips = section.querySelector('.trips'),
			conferences = section.querySelector('.conferences'),
			today = new Date()
	
		let city = 'Perth',
			country = 'Australia',
			currentTrip = '',
			conf,
			tripList,
			confList
	
		travel.some(trip => {
			let away = false
	
			if (dateFns.isSameDay(today, new Date(trip.start))) {
				away = true
			} else if (dateFns.isAfter(today, new Date(trip.start))) {
				if (dateFns.isBefore(today, new Date(trip.end))) {
					away = true
				} else if (dateFns.isSameDay(today, new Date(trip.end))) {
					away = true
				}
			} else {
				return false
			}
	
			if (away) {
				city = trip.city
				country = trip.country || 'Australia'
				currentTrip = `(${dateFns.format(new Date(trip.start), 'DD MMM')} - ${dateFns.format(new Date(trip.end), 'DD MMM')})`
	
				return true
			}
		})
	
		events.some(event => {
			let atConf = false
			if (dateFns.isSameDay(today, new Date(event.start))) {
				atConf = true
			} else if (dateFns.isAfter(today, new Date(event.start))) {
				if (dateFns.isBefore(today, new Date(event.end))) {
					atConf = true
				} else if (dateFns.isSameDay(today, new Date(event.end))) {
					atConf = true
				}
			} else {
				return false
			}
	
			if (atConf) {
				conf = `at ${event.name}`
	
				return true
			}
		})
	
		tripList = travel.map(trip => {
			let country = trip.country || 'Australia',
				start = dateFns.format(new Date(trip.start), 'DD MMM'),
				end = trip.end ? `- ${dateFns.format(new Date(trip.end), 'DD MMM')}` : false,
				classes = country.toLowerCase().replace(' ', '-')
	
			if (dateFns.isAfter(new Date(trip.start), today)) {
				return `<li class="${classes}">${trip.city}, ${country}: ${start} ${end}</li>`
			}
		})
	
		confList = events.map(event => {
			let start = dateFns.format(new Date(event.start), 'DD MMM'),
				end = event.end ? `- ${dateFns.format(new Date(event.end), 'DD MMM')}` : '',
				name = event.name,
				classes = event.type
	
			if (dateFns.isAfter(new Date(event.start), today)) {
				return `<li class="${classes}">${name}: ${start} ${end}</li>`
			}
		})
	
		let countryClass = country.toLowerCase().replace(' ', '-')
	
		location.innerHTML = `${city}, ${country} ${currentTrip}`
		location.classList.add(countryClass)
		conference.innerHTML = conf ? conf : ''
		trips.innerHTML = tripList.join('')
		conferences.innerHTML = confList.join('')
	})
}
	
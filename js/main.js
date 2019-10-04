const travel = [
		{
			start: '2019-10-09',
			end: '2019-10-19',
			city: 'Sydney',
			country: 'Australia',
			timezone: 'Australia/Sydney',
		},
		{
			start: '2019-10-30',
			end: '2019-11-02',
			city: 'Sydney',
			country: 'Australia',
			timezone: 'Australia/Sydney',
		},
		{
			start: '2019-11-02',
			end: '2019-11-09',
			city: 'Orlando',
			country: 'United States',
		},
		{
			start: '2019-11-22',
			end: '2019-11-24',
			city: 'Adelaide',
		},
		{
			start: '2019-12-08',
			end: '2019-12-14',
			city: 'Brisbane',
		},
	],
	events = [
		{
			start: '2019-10-10',
			name: 'Twilio Engage and Superclass',
			type: 'speaking',
		},
		{
			start: '2019-10-16',
			end: '2019-10-18',
			name: 'NDC Sydney',
			type: 'speaking',
		},
		{
			start: '2019-10-31',
			end: '2019-11-01',
			name: 'Laracon AU',
			type: 'speaking',
		},
		{
			start: '2019-11-04',
			end: '2019-11-08',
			name: 'Microsoft Ignite',
			type: 'attending',
		},
		{
			start: '2019-11-23',
			name: 'DDD Adelaide',
			type: 'speaking',
		},
		{
			start: '2019-12-09',
			end: '2019-12-10',
			name: 'YOW! Brisbane',
			type: 'attending',
		},
	]

document.addEventListener('DOMContentLoaded', () => {
	const section = document.querySelector('#where'),
		location = section.querySelector('.location'),
		conference = section.querySelector('.conference'),
		trips = section.querySelector('.trips'),
		conferences = section.querySelector('.conferences'),
		today = new Date()

	let city = 'Perth',
		country = 'Australia 🇦🇺',
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
			country = trip.country
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
			end = trip.end ? `- ${dateFns.format(new Date(trip.end), 'DD MMM')}` : false

		switch (country) {
			case 'Australia':
				country = `${country} 🇦🇺`
				break
			case 'United States':
				country = `${country} 🇺🇸`
				break
		}

		if (dateFns.isAfter(new Date(trip.start), today)) {
			return `<li>${trip.city}, ${country}: ${start} ${end}</li>`
		}
	})

	confList = events.map(event => {
		let start = dateFns.format(new Date(event.start), 'DD MMM'),
			end = event.end ? `- ${dateFns.format(new Date(event.end), 'DD MMM')}` : '',
			name = event.name

		switch (event.type) {
			case 'speaking':
				name = `🎤 ${name}`
				break
			case 'attending':
				name = `🎫 ${name}`
				break
		}

		if (dateFns.isAfter(new Date(event.start), today)) {
			return `<li>${name}: ${start} ${end}</li>`
		}
	})

	location.innerHTML = `${city}, ${country} ${currentTrip}`
	conference.innerHTML = conf ? conf : ''
	trips.innerHTML = tripList.join('')
	conferences.innerHTML = confList.join('')
})

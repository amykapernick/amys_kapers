const slugify = (string) => string.toLowerCase().replace(' ', '-')
const icons = {
	speaking: {
		img: "mic",
		alt: "speaking"
	},
	organising: {
		img: "notes",
		alt: "organising"
	},
	attending: {
		img: "badge",
		alt: ""
	},
	workshop: {
		img: "presentation",
		alt: "running a workshop"
	}
}

console.log('running script 3')

if (typeof document !== 'undefined') {
	console.log('running script 2')
	const section = document.querySelector('#where')

	console.log('running script')

	if (section) {

		const location = section.querySelector('.location')
		const currentConference = section.querySelector('.conference')
		const trips = section.querySelector('.trips')
		const conferences = section.querySelector('.conferences')

		fetch('{{env.api}}/events')
			.then(res => res.json())
			.then(res => {
				if (res.length) {
					conferences.innerHTML = '<ul></ul>'

					const conferenceList = conferences.querySelector('ul')
					const eventItems = res.map(({ type, name, start, end, url }) => {
						const svgs = type?.map(t => (`<img alt="${type} icon" src="/img/icons/${icons[t].img}.svg" />`)).join('')
						let content = `${svgs} ${name}: ${start}${end}`

						if (url) {
							content = `<a href="${url}" target="_blank">${content}</a>`
						}

						return (
							`<li>${content}</li>`
						)
					})

					conferenceList.innerHTML = eventItems.join('')
				}
				else {
					conferences.innerHTML = `<p>Be right back, taking a much needed break</p>`
				}
			})

		fetch('{{env.api}}/travel')
			.then(res => res.json())
			.then(res => {
				if (res.length) {
					trips.innerHTML = '<ul></ul>'

					const tripsList = trips.querySelector('ul'),
						tripItems = res.map(({ country_code, country, city, start, end }) => (
							`<li><img alt="Flag of ${country}" src="/img/countries/${country_code}.svg" />${city}, ${country}: ${start}${end}</li>`
						))

					tripsList.innerHTML = tripItems.join('')
				}
				else {
					trips.innerHTML = '<p>Nothing right now, I guess the suitcase can actually go away this time...</p>'
				}
			})

		fetch('{{env.api}}/current')
			.then(res => res.json())
			.then(({ country, city, country_code, eventType, conference, eventUrl }) => {
				location.innerHTML = `<img alt="Flag of ${country}" src="/img/countries/${country_code}.svg" /> ${city}, ${country}`

				let conferenceInfo = `${conference}`

				if (eventType) {
					conferenceInfo = `${eventType.map(t => (`<img alt="${icons[t].alt}" src="/img/icons/${icons[t].img}.svg" />`)).join('')} ${conferenceInfo}`
				}

				if (eventUrl) {
					conferenceInfo = `<a href="${eventUrl}" target="_blank">${conferenceInfo}</a>`
				}

				currentConference.innerHTML = conferenceInfo
			})
	}


}
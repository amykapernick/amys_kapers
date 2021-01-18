const slugify = (string) => string.toLowerCase().replace(' ', '-')

if (typeof document !== 'undefined') {
	document.addEventListener('DOMContentLoaded', () => {
		const section = document.querySelector('#where'),
			location = section.querySelector('.location'),
			conference = section.querySelector('.conference'),
			trips = section.querySelector('.trips'),
			conferences = section.querySelector('.conferences')

		fetch('http://localhost:7071/api/events')
		.then(res => res.json())
		.then(res => {
			if(res.length) {
				conferences.innerHTML = '<ul></ul>'
			
			const conferenceList = conferences.querySelector('ul'),
			eventItems = res.map(({classes, name, start, end}) => (
				`<li class="${classes}">${name}: ${start}${end}</li>`
			))

			conferenceList.innerHTML = eventItems.join('')
			}
			else {
				conferences.innerHTML = `<p>Be right back, taking a much needed break</p>`
			}
		})

		fetch('http://localhost:7071/api/travel')
		.then(res => res.json())
		.then(res => {
			if(res.length) {
				trips.innerHTML = '<ul></ul>'
			
				const tripsList = trips.querySelector('ul'),
				tripItems = res.map(({classes, country, city, start, end}) => (
					`<li class="${classes}">${city}, ${country}: ${start}${end}</li>`
				))
	
				tripsList.innerHTML = tripItems.join('')
			}
			else {
				trips.innerHTML = '<p>🤣, not any time soon</p>'
			}
		})

		fetch('http://localhost:7071/api/current')
		.then(res => res.json())
		.then(res => {
			location.innerHTML = `${res.city}, ${res.country}`
			location.classList.add(slugify(res.country))
			conference.innerHTML = res.conference
			conference.classList.add(res.confClasses)
		})
	})
}
	
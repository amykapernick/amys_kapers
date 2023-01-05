const videoUrl = ({ url, provider }) => {
	if (provider === 'youtube') {
		const videoId = url.match(/(?:v=|be\/)(?<videoId>(\d|\w|-)+)/i)?.groups.videoId

		return `https://www.youtube.com/embed/${videoId}`
	}
}

const videoProvider = (url) => {
	const site = url.match(/https?:\/\/(?:www\.)?(?<site>(\d|\w|\.)+)\//i)?.groups.site

	switch (site) {
		case 'youtube.com':
		case 'youtu.be':
			return 'youtube'
		case 'vimeo.com':
			return 'vimeo'
	}
}

const embedAttrs = (provider) => {
	switch (provider) {
		case 'youtube':
			return {
				allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
				frameborder: 0,
				allowfullscreen: true
			}
	}
}

const videoEmbed = (url) => {
	const provider = videoProvider(url)
	const embedUrl = videoUrl({ url, provider })
	const attrs = embedAttrs(provider)


	return ({
		provider,
		embedUrl,
		embedAttrs: {
			...attrs,
		}
	})
}

export default videoEmbed
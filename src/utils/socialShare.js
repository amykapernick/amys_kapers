const facebook = (post) => {
	return `https://www.facebook.com/sharer/sharer.php?u=${post}`
}

const twitter = (post) => {
	return `https://twitter.com/intent/tweet?text=%40amys_kapers%20wrote%20this%20really%20cool%20blog%20post,%20you%20should%20check%20it%20out!%20${post}`
}

const socialShare = (post, platform) => {
	const url = post.match(/https/) ? post : `${process.env.SITE_URL}/${post}`

	if (platform == 'facebook') {
		return facebook(url)
	}

	if (platform == 'twitter') {
		return twitter(url)
	}

	return ''
}

export default socialShare
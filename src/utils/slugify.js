const slugify = (string) => {
	return string.replace(/ /g, '-').toLowerCase()
}

export default slugify
const {parse, format} = require('date-fns')

const formatDate = (date, dateFormat = 'dd MMM') => {
	const dateObj = parse(date, 'yyyy-MM-dd', new Date())
	
    return format(dateObj, dateFormat)
}

module.exports = formatDate
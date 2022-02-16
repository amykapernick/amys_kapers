const formatData = ({data, options, params}) => {
	data.forEach((i) => {
        const values = i.split(`=`);

        if(values && values[0]) {
            const key = values[0].replace(/\+/g, ' ')
            let value = values[1].replace(/\+/g, ' ')

            if(options[key]) {
                if(options[key].opts) {
                    const selected = options[key].opts.find(e => e.value == value)
                    value = selected ? `${value} - ${selected.label}` : value
                }
                else {
                    const selected = options[key].find(e => e.value == value)
                    value = selected ? selected.label : value
                }
            }
            
            params[key] = value.replace(/,/g, '');
        }
	});

	return params
}

module.exports = formatData
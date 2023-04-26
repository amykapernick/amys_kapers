const checkReference = (value, variables) => {
	if (
		RegExp(/^@/).test(value) &&
		variables[value.replace(/^@/, '')]
	) {
		return true
	}

	return false
}

const replaceReference = (value, variables) => {
	return variables[value.replace(/^@/, '')]
}

const formatVariables = (variables) => {
	const formattedVariables = {}

	Object.entries(variables).forEach(([key, value]) => {
		if (typeof value === 'string') {
			if (checkReference(value, formattedVariables)) {
				formattedVariables[key] = replaceReference(value, formattedVariables)
			}
			else {
				formattedVariables[key] = value
			}
		}
		else if (Array.isArray(value)) {
			value.forEach((sub, i) => {
				const index = i === 0 ? '' : `_${i + 1}`
				if (typeof sub === 'string') {
					if (checkReference(sub, formattedVariables)) {
						formattedVariables[`${key}${index}`] = replaceReference(sub, formattedVariables)
					}
					else {
						formattedVariables[`${key}${index}`] = sub
					}
				}
				else if (typeof sub === 'object') {
					Object.entries(sub).forEach(([subKey, subValue]) => {
						const shade = subKey === 'main' ? '' : `_${subKey}`
						if (typeof subValue === 'string') {
							if (checkReference(subValue, formattedVariables)) {
								formattedVariables[`${key}${index}${shade}`] = replaceReference(subValue, formattedVariables)
							}
							else {
								formattedVariables[`${key}${index}${shade}`] = subValue
							}

						}
					})
				}
			})
		}
		else if (typeof value === 'object') {
			Object.entries(value).forEach(([subKey, subValue]) => {
				if (typeof subValue === 'string') {
					if (checkReference(subValue, formattedVariables)) {
						formattedVariables[`${key}_${subKey}`] = replaceReference(subValue, formattedVariables)
					}
					else {
						formattedVariables[`${key}_${subKey}`] = subValue
					}

				}
			})
		}
	})

	return formattedVariables
}

module.exports = formatVariables
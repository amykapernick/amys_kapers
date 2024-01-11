import { isSameMonth, setDate, getDay, getDate, getMonth, parseISO, getYear } from 'date-fns'

const parseProjects = (allProjects) => {
	const projects = []

	allProjects.forEach(project => {

		const start = parseISO(project?.dates?.start)
		const end = project?.dates?.end ? parseISO(project?.dates?.end) : start
		const setGrid = ({ start: s, end: e = s }) => {
			const data = {
				offset: getDay(setDate(s, 1)) + getDate(s),
				length: getDate(e) - getDate(s) + 1,
				row: getMonth(s) + 1,
				year: getYear(s)
			}

			return data
		}

		const projectData = {
			...project,
			start,
			end
		}

		if (!isSameMonth(start, end)) {
			const dates = [
				{
					start: start,
					end: setDate(end, 0)
				},
				{
					start: setDate(end, 1),
					end: end
				},
			]

			projects.push(...[
				{
					...projectData,
					...dates[0],
					...setGrid({ ...dates[0] })
				},
				{
					...projectData,
					...dates[1],
					...setGrid({ ...dates[1] })
				}
			])
		}
		else {
			projects.push({
				...projectData,
				...setGrid({ start, end })
			})
		}
	})

	return projects
}

export default parseProjects
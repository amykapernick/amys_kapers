const { getYear, getMonth, getDate } = require('date-fns');
const calendarYears = require('../utils/calendar/years')

module.exports = async function (context, req) {
    let response = {
        body: {}
    }
    const url = req.url.split('/api')?.[0]
    const events = await fetch(`${url}/api/events?filter=all`)
        .then(res => res.json())
        .catch(error => {
            response.status = 500
            response.body = {
                error
            }
        });
    const travel = await fetch(`${url}/api/travel?filter=all`).then(res => res.json())
        .catch(error => {
            response.status = 500
            response.body = {
                error
            }
        });
    const projects = await fetch(`${url}/api/projects?filter=all&status=current`).then(res => res.json()).catch(error => {
        response.status = 500
        response.body = {
            error
        }
    });
    const dates = calendarYears(events)
    const yearDates = {}
    const thisYear = getYear(new Date())
    const data = {
        events,
        trips: travel,
        projects
    }

    Object.entries(data).forEach(([type, events]) => {
        events.forEach(event => {
            const { start, end } = event.dates
            const startDate = {
                year: getYear(new Date(start)),
                month: getMonth(new Date(start)) + 1,
                day: getDate(new Date(start)),
            }
            const endDate = end && {
                year: getYear(new Date(end)),
                month: getMonth(new Date(end)) + 1,
                day: getDate(new Date(end)),
            }

            if (startDate.year < thisYear && endDate.year < thisYear) return

            if (!endDate) event.endDay = true

            dates[startDate.year][startDate.month][startDate.day][type].push({
                ...event,
                startDay: true
            })

            if (endDate) {
                // console.log({ endDate, date: dates[endDate.year][endDate.month][endDate.day] })
                dates[endDate.year][endDate.month][endDate.day][type].push({
                    ...event,
                    endDay: true
                })

                let currentDate = new Date(start)

                while (currentDate < new Date(end)) {
                    currentDate.setDate(currentDate.getDate() + 1)

                    const year = getYear(currentDate)
                    const month = getMonth(currentDate) + 1
                    const day = getDate(currentDate)

                    dates[year][month][day][type].push({
                        ...event,
                    })
                }
            }
        })
    })

    Object.entries(dates).forEach(([year, months]) => {
        if (!yearDates[year]) yearDates[year] = []

        Object.values(months).forEach((month) => {
            Object.values(month).forEach((day) => {
                yearDates[year].push(day)
            })
        })
    })

    response.body = {
        ...response.body,
        yearDates
    }

    context.res = {
        status: response.status || 200,
        body: response.body
    };
}
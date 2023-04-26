const { parse, compareAsc, isBefore, isSameDay } = require('date-fns')
const formatDate = require('../utils/formatDate')
const countryCode = require('../utils/countryCode')

module.exports = async function (context, req) {
    const trips = require('../_data/travel.json')
    const today = new Date()

    const filter = req?.query?.filter

    let currentTrips = trips

    if (filter !== 'all') {
        currentTrips = currentTrips
            .filter((trip) => {
                const date = trip.end ? parse(trip.end, 'yyyy-MM-dd', new Date()) : parse(trip.start, 'yyyy-MM-dd', new Date())

                return isSameDay(today, date) || isBefore(today, date)
            })
    }

    currentTrips = currentTrips
        .sort((a, b) => (compareAsc(
            parse(a.start, 'yyyy-MM-dd', new Date()),
            parse(b.start, 'yyyy-MM-dd', new Date())
        )))
        .map(trip => ({
            ...trip,
            start: formatDate(trip.start, 'dd MMM'),
            end: trip.end ? ` - ${formatDate(trip.end)}` : '',
            dates: {
                end: trip.end && formatDate(trip.end, 'yyyy-MM-dd'),
                start: formatDate(trip.start, 'yyyy-MM-dd')
            },
        }))

    const tripData = currentTrips.map(({ country = 'Australia', city, ...trip_args }) => {
        if (!city && country == 'Australia') city = 'Perth'
        return ({
            ...trip_args,

            city: city,
            country: country,
            country_code: countryCode(country),
        })
    })

    context.res = {
        body: tripData
    };
}
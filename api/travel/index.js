const {parse, compareAsc, isBefore, isSameDay} = require('date-fns')
const formatDate = require('../utils/formatDate')
const slugify = (string) => string.toLowerCase().replace(' ', '-')

module.exports = async function (context, req) {
    const trips = require('../_data/travel.json'),
    today = new Date()

    const currentTrips = trips
        .filter((trip) => {
            const date = trip.end ? parse(trip.end, 'yyyy-MM-dd', new Date()) : parse(trip.start, 'yyyy-MM-dd', new Date())

            return isSameDay(today, date) || isBefore(today, date)
        })
        .sort((a, b) => (compareAsc(
            parse(a.start, 'yyyy-MM-dd', new Date()),
            parse(b.start, 'yyyy-MM-dd', new Date())
        )))
        .map(trip => ({
            ...trip,
            start: formatDate(trip.start, 'dd-MMM'),
            end: trip.end ? ` - ${formatDate(trip.end)}` : ''
        }))

        const tripData = currentTrips.map((trip) => ({
            ...trip,
            classes: slugify(trip.country || 'australia'),
            city: trip.city || 'Perth',
            country: trip.country || 'Australia'
        }))


    context.res = {
        body: tripData
    };
}
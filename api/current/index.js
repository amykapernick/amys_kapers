const { parse, isSameDay, isAfter, isBefore } = require('date-fns')
const formatDate = require('../utils/formatDate')
const countryCode = require('../utils/countryCode')

module.exports = async function (context, req) {
    const events = require('../_data/events.json')
    const trips = require('../_data/travel.json')
    const today = new Date()

    let currentDetails = {
        city: 'Perth',
        country: 'Australia',
        conference: '',
        trip: '',
        country_code: 'au'
    }

    const setTrip = (newTrip) => {
        currentDetails = {
            ...currentDetails,
            ...newTrip,
            trip: `${formatDate(newTrip.start, 'dd-MMM')}${newTrip.end ? ` - ${formatDate(newTrip.end)}` : ''}`,
            country_code: countryCode(newTrip?.country || currentDetails.country)
        }
    }

    const setEvent = (newEvent) => {
        currentDetails = {
            ...currentDetails,
            conference: `at ${newEvent.name}`,
            eventType: newEvent.type,
            eventUrl: newEvent.url
        }
    }

    trips.some((trip) => {
        const start = parse(trip.start, 'yyyy-MM-dd', new Date())
        const end = trip.end ? parse(trip.end, 'yyyy-MM-dd', new Date()) : false

        if (isSameDay(start, today) || isSameDay(end, today)) {
            setTrip(trip)
            return true
        }
        else if (isAfter(today, start) && end && isBefore(today, end)) {
            setTrip(trip)
            return true
        }

        return false
    })

    events.some((event) => {
        const start = parse(event.start, 'yyyy-MM-dd', new Date())
        const end = event.end ? parse(event.end, 'yyyy-MM-dd', new Date()) : false


        if (isSameDay(start, today) || isSameDay(end, today)) {
            setEvent(event)
            return true
        }
        else if (isAfter(today, start) && event.end && isBefore(today, end)) {
            setEvent(event)
            return true
        }

        return false
    })


    context.res = {
        body: currentDetails
    };
}
const {parse, isSameDay, isAfter, isBefore} = require('date-fns')
const formatDate = require('../utils/formatDate')

module.exports = async function (context, req) {
    const events = require('../_data/events.json'),
    trips = require('../_data/travel.json'),
    today = new Date()
    
    let currentDetails = {
        city: 'Perth',
        country: 'Australia',
        conference: '',
        trip: '',
    }

    trips.some((trip) => {
        const start = parse(trip.start, 'yyyy-MM-dd', new Date()),
        end = trip.end ? parse(trip.end, 'yyyy-MM-dd', new Date()) : false,
        setTrip = (trip) => {
            currentDetails = {
                ...currentDetails,
                trip: `${formatDate(trip.start, 'dd-MMM')}${trip.end ? ` - ${formatDate(trip.end)}` : ''}`,
                city: trip.city || currentDetails.city,
                country: trip.country || currentDetails.country
                
            }
        }

        if(isSameDay(start, today) || isSameDay(end, today)) {
            setTrip(trip)
            return true
        }
        else if (isAfter(today, start) && trip.end && isBefore(today, end)) {
            setTrip(trip)
            return true
        }

        return false
    })

    events.some((event) => {
        const start = parse(event.start, 'yyyy-MM-dd', new Date()),
        end = event.end ? parse(event.end, 'yyyy-MM-dd', new Date()) : false,
        setEvent = (event) => {
            currentDetails = {
                ...currentDetails,
                conference: `at ${event.name}`,
                confClasses: event.type
            }
        }

        if(isSameDay(start, today) || isSameDay(end, today)) {
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
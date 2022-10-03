const { parse, compareAsc, isBefore, isSameDay } = require('date-fns')
const formatDate = require('../utils/formatDate')
const slugify = (string) => string.toLowerCase().replace(' ', '-')

module.exports = async function (context, req) {
    const events = require('../_data/events.json'),
        today = new Date()

    const currentEvents = events
        .filter((event) => {
            const date = event.end ? parse(event.end, 'yyyy-MM-dd', new Date()) : parse(event.start, 'yyyy-MM-dd', new Date())

            return isSameDay(today, date) || isBefore(today, date)
        })
        .sort((a, b) => (compareAsc(
            parse(a.start, 'yyyy-MM-dd', new Date()),
            parse(b.start, 'yyyy-MM-dd', new Date())
        )))
        .map(event => ({
            ...event,
            start: formatDate(event.start, 'dd MMM'),
            end: event.end ? ` - ${formatDate(event.end, 'dd MMM')}` : ''
        }))

    const eventData = currentEvents.map(({ type = ['attending'], ...event_args }) => ({
        ...event_args,
        type: Array.isArray(type) ? type : [type],
    }))


    context.res = {
        body: eventData
    };
}
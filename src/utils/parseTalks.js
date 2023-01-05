import { isAfter } from "date-fns"

const parseTalks = (talkData) => {
	const talks = {}

	talkData.forEach(talk => {
		const data = talk?.links?.self?.match(/^https:\/\/noti.st\/(?<user>(?:\w|\d|-)+)\/(?<id>(?:\w|\d)+)\/(?<slug>(?:\w|\d|-)+)$/)?.groups || {}


		const talkInfo = {
			title: talk?.attributes?.title,
			date: new Date(talk?.attributes?.presented_on),
			url: talk?.links?.self,
			image: talk?.attributes?.image?.src,
			related: talk?.links?.related,
			event: talk?.links?.event,
			...data,
		}

		if (!talks[talkInfo.slug]) {
			talks[talkInfo.slug] = {
				title: talkInfo?.title,
				date: talkInfo?.date,
				related: talkInfo?.related,
				events: []
			}
		}

		if (isAfter(talkInfo.date, talks[talkInfo.slug].date)) {
			talks[talkInfo.slug].date = talkInfo.date
		}

		talks[talkInfo.slug].events.push({
			...talkInfo,
		})
	})

	return { talks }
}

export default parseTalks
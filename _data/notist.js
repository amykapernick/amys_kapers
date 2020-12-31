require('dotenv').config()

const url = process.env.NOTIST_FEED,
axios  = require('axios');

module.exports = () => {
	if(!url) {
		return false
	}

	console.log(url)

	return new Promise((resolve, reject) => {
		axios.get(url).then((response) => {
			const talkData = response.data.data[0].relationships.data,
				eventURLs = [],
				talks = [],
				allTalks = {};
			
			talkData.forEach(talk => {
				eventURLs.push(talk.links.event);

				const talkInfo = {
					title: talk.attributes.title,
					date: new Date(talk.attributes.presented_on),
					link: talk.links.self
				},
				talkId = talk.links.event.match(/https:\/\/noti\.st\/events\/((\d|\w)+)\.json/)[1]

				if(allTalks[talkId]) {
					allTalks[talkId].push(talkInfo)
				}
				else {
					allTalks[talkId] = [talkInfo]
				}

				
			})
			
			axios.all(eventURLs.map(l => axios.get(l))).then(axios.spread(function (...res) {
				const events = {
					future : [],
					past : []
				};
				
				const now = new Date();
				
				for (const talk in res) {
					const thisTalk = {
						event: {
							...res[talk].data.data[0].attributes
						},
						...allTalks[res[talk].data.data[0].id.replace(/^ev_/, '')][0]
					};
					const when = new Date(thisTalk.ends_on);
					const future = now - when < 0 ? true : false;
					
					if(future) {
						events.future.push(thisTalk);
					} else {
						events.past.push(thisTalk);
					}
				}
				resolve({'url': url, 'events': events  });
			}))
			.catch((error) => {
				reject(error);
			})
		})

	})
}
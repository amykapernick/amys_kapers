require('dotenv').config()
const {Client} = require('@notionhq/client')

const notion = new Client({
    auth: process.env.NOTION_API
})

module.exports = async ({params, fields, res, context, title}) => {
	let data = {}

	Object.entries(params).forEach(([key, val]) => {
        const section = fields[key]

		if(!section || !section.type || !section.name) return;

        if(section.type == 'rich_text') {
            data[section.name] = {
                [section.type]: [
                    {
                        type: "text",
                        text: {
                                content: val
                        }
                    },
                ]
            }
        }
		else if(section.type == 'multi_select') {
			const opts = []

			val.forEach(e => {
                el.push({
                    name: e
                })
            })

            data[section.name] = {
                [section.type]: opts
            }
        }
        else {
            data[section.name] = {
                [section.type]: {
                    name: val
                }
            }
        }
        
    })

	await notion.pages.create({
			parent: fields.data.parent,
			properties: {
				title,
				...data,
			}
		})
		.then(res => context.log(res))
		.catch(err => {
			context.log(err)

			res = {
				status: 302,
				headers: {
					location: params.page
				}
			};
		})

    res = {
        status: 302,
        headers: {
            location: params.redirect
        }
    };
}
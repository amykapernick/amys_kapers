require('dotenv').config()
const { set } = require('date-fns')
const formatDate = require('../utils/formatDate')
const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_WORK_API })

module.exports = async function (context, req) {
    const today = new Date()
    const filter = req?.query?.filter

    let datesFilter = {
        and: [
            {
                property: 'Dates',
                date: {
                    on_or_after: today
                }
            }
        ]
    }

    if (filter === 'all') {
        datesFilter = {
            and: [
                {
                    property: 'Dates',
                    date: {
                        on_or_after: set(today, { month: 0, date: 1 })
                    }
                }
            ]
        }
    }

    const notionProjects = await notion.databases.query({
        database_id: process.env.PROJECTS_DB_ID,
        filter: datesFilter,
    })

    const projects = notionProjects.results.map(({ properties }) => ({
        name: properties['Project name'].title[0].plain_text,
        start: properties['Status'].status.name,
        dates: properties['Dates']?.date,
        capacity: properties['Capacity']?.number,
    }))

    context.res = {
        body: projects
    };
}
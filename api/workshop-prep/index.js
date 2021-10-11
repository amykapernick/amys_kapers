require('dotenv').config()
const {Client} = require('@notionhq/client')
const options = require('../_data/forms/workshopPrep')

const notion = new Client({
    auth: process.env.NOTION_API
})

module.exports = async function (context, req) {
    // context.log(req)
    // context.log(options)

    let params = {
        form: 'workshop-prep'
    } 
    let data = {}
    
    decodeURIComponent(req.body).split(`&`).forEach((i) => {
        const values = i.split(`=`);

        if(values && values[0]) {
            const key = values[0].replace(/\+/g, ' ')
            let value = values[1].replace(/\+/g, ' ')

            if(options[key]) {
                if(options[key].opts) {
                    const selected = options[key].opts.find(e => e.value == value)
                    value = selected ? selected.label : value
                }
                else {
                    const selected = options[key].find(e => e.value == value)
                    value = selected ? selected.label : value
                }
            }
            
            params[key] = value;
        }
    });

    Object.entries(params).forEach(([key, val]) => {
        if(key == 'os') {
            data['Operating System'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'node_cli') {
            data['Node and CLI'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'js_skills') {
            data['JavaScript Skills'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'css_skills') {
            data['CSS Skills'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'browser') {
            data['Browser'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'node_version') {
            data['Node Version'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'html') {
            const el = []

            val.split(',').forEach(e => {
                el.push({
                    name: e
                })
            })

            data['HTML Elements'] = {
                multi_select: el
            }
        }
    })

    await notion.pages.create({
        parent: {
            database_id: 'ba395e09748a4cc78ba767b309f7294c'
        },
        properties: {
            title: {
                title: [
                    {
                        text: {
                            content: params.name
                        }
                    }
                ]
            },
            ...data,
        }
    })
    .then(res => {

    })
    .catch(err => {
        context.log(err)

        context.res = {
            status: 302,
            headers: {
                location: process.env.FORM_PAGE
            }
        };
    })

    context.res = {
        status: 302,
        headers: {
            location: process.env.WSHOP_PRE_REDIRECT
        }
    };
}
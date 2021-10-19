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
        if(key == 'sections') {
            data['Sections'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'html') {
            data['Semantic HTML'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'css') {
            data['CSS Layouts'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'a11y') {
            data['Accessibility Testing'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'visual_regression') {
            data['Visual Regression Testing'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'ui') {
            data['UI Testing'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'pacing') {
            data['Pacing'] = {
                select: {
                    name: val
                }
            }
        }
        else if(key == 'feedback') {
            data['Feedback'] = {
                rich_text: [
                    {
                      type: "text",
                      text: {
                            content: val
                        }
                    },
                ]
            }
        }
        else if(key == 'comments') {
            data['Comments'] = {
                rich_text: [
                    {
                      type: "text",
                      text: {
                            content: val
                        }
                    },
                ]
            }
        }
        else if(key == 'testimonial') {
            data['Testimonial'] = {
                rich_text: [
                    {
                      type: "text",
                      text: {
                            content: val
                        }
                    },
                ]
            }
        }
        
    })

    await notion.pages.create({
        parent: {
            database_id: '93c566ec267e4b70bf7808b501f32809'
        },
        properties: {
            title: {
                title: [
                    {
                        text: {
                            content: params.name || 'Anonymous'
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
require('dotenv').config()

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


module.exports = async function (context, req) {
    const types = {
        days_2: '29 and 30 April - Full Workshop',
        days_1_html_css: '29 April - Semantic HTML and CSS Layouts',
        days_1_testing: '30 April - Front End Testing',
        other: `I can't make this workshop, but want to know when the next one is`
    }

    let params = {} 
    
    decodeURIComponent(req.body).split(`&`).forEach((i) => {
        const values = i.split(`=`);

        if(values && values[0]) {
            params[values[0].replace(/\+/g, ' ')] = values[1].replace(/\+/g, ' ');
        }
    });

    context.log('Params:')
    context.log(params)

    const html = `
    <p>New Workshop Booking:</p>
    <ul>
        <li>Name: ${params && params.name}</li>
        <li>Email: ${params && params.email}</li>
        <li>Company: ${params && params.company}</li>
        <li>Tickets: ${params && params.tickets}</li>
        <li>Ticket Type: ${types[params && params.type]}</li>
        <li>Notes: <p>${(params && params.notes) && params.notes.replace(/\+/g, ' ')}</p></li>
    </ul>
`

    const msg = {
        to: process.env.FORM_EMAIL,
        from: {
            name: params.name,
            email: params.email
        },
        subject: `New Workshop Booking: ${params.name}`,
        html
    }

    await sgMail
        .send(msg)
        .then((res) => {
            context.log(res)
        },
        (err) => {
            context.log(err)

            context.res = {
                status: 302,
                headers: {
                    location: process.env.FORM_PAGE
                }
            };
        })
        .catch((err) => {
            context.log('Error!')
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
            location: process.env.BOOKING_REDIRECT
        }
    };
}
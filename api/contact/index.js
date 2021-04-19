require('dotenv').config()

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


module.exports = async function (context, req) {
    context.log(req)
    const types = {
        workshop: 'Workshop',
        talk: 'Talk',
        other: `Something Else`
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
    <p>New Enquiry:</p>
    <ul>
    <li>Name: ${params && params.name}</li>
    <li>Email: ${params && params.email}</li>
    <li>Company: ${params && params.company}</li>
        <li>Type: ${types[params && params.type]}</li>
        <li>Message: <p>${(params && params.message) && params.message.replace(/\+/g, ' ')}</p></li>
    </ul>
`

    const msg = {
        to: process.env.FORM_EMAIL,
        from: {
            name: params.name,
            email: params.email
        },
        subject: `New Enquiry: ${params.name}`,
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
                // status: 200, /* Defaults to 200 */
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
                // status: 200, /* Defaults to 200 */
                status: 302,
                headers: {
                    location: process.env.FORM_PAGE
                }
            };
        })

    context.res = {
        // status: 200, /* Defaults to 200 */
        status: 302,
        headers: {
            location: process.env.CONTACT_REDIRECT
        }
    };
}
require('dotenv').config()

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async ({res, context, params, page}) => {
	const spam = ['eric.jones.z.mail@gmail.com']

	if(spam.includes(params.email)) {
		context.log(`Spam inquiry ${params.email}`)
        res = {
            status: 403,
            headers: {
                location: params.page
            }
        };
    }

	await sgMail
        .send(params.msg)
        .then((res) => {
            context.log(res)
        },
        (err) => {
            context.log('Error!')
            context.log(err)

            res = {
                status: 302,
                headers: {
                    location: params.page
                }
            };
        })
        .catch((err) => {
            context.log('Error!')
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
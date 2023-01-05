const sendEmail = require('../utils/sendEmail')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let params = {}

    decodeURIComponent(req.body).split(`&`).forEach((i) => {
        const values = i.split(`=`);

        if (values && values[0]) {
            params[values[0].replace(/\+/g, ' ')] = values[1].replace(/\+/g, ' ');
        }
    });

    context.log({ params })

    if (params?.function) {
        // context.res = {
        //     // status: 200, /* Defaults to 200 */
        //     body: responseMessage
        // };
    }
    else {
        const html = `<p>New Form Submission:</p><ul>${Object.entries(params).map(([name, value]) => (`<li>${name}: ${value}</li>`))}</ul>`

        const msg = {
            from: {
                name: params.name,
                email: params.email
            },
            subject: `New Form Submission on ${params.page}: ${params.name}`,
            html
        }

        console.log({ msg })

        await sendEmail({
            params: {
                ...params,
                msg,
            },
            context,
        }).then(res => {
            context.res = {
                ...res
            }
        })
    }
}
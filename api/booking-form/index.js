module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let params = {} 
    
    decodeURIComponent(req.body).split(`&`).forEach((i) => {
        const values = i.split(`=`);

        params[values[0].replace('+', ' ')] = values[1].replace('+', ' ');
    });

    context.log(params)

    context.res = {
        // status: 200, /* Defaults to 200 */
        status: 302,
        headers: {
            location: process.env.BOOKING_REDIRECT
        },
        body: params
    };
}
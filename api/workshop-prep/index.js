require('dotenv').config()
const options = require('../_data/forms/workshopPrep')
const fields = require('../_data/forms/workshopPrep')


module.exports = async function (context, req) {
    let params = {
        form: 'workshop-prep'
    } 
    
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

            if(key == 'html') {
                value = value.split(',')
            }

            params[key] = value;
        }
    });

    await createPage({
        params,
        fields,
        res: context.res,
        context,
        title: {
            title: [
                {
                    text: {
                        content: params.name
                    }
                }
            ]
        },
    })
}
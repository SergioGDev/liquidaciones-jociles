const {{ pascalCase name }} = require('./{{ camelCase name }}s.model')

async function test(req, res) {
    res.status(200).send({
        type: 'ok',
        msg: 'Test {{ camelCase name }} controller'
    })
}

async function getAll(req, res) {
    const params = req.body

    if (!params) {
        res.status(400).send({
            type: 'error',
            msg: 'Error sending data.'
        })
    } else {
        try {
            const {{ camelCase name }} = await {{ pascalCase name }}.find()

            if ({{ camelCase name }}) {
                res.status(200).send({ 
                    type: 'ok',
                    length: {{ camelCase name }}.length,
                    data: {{ camelCase name }},
                 })
            } else {
                res.status(400).send({
                    type: 'error',
                    msg: 'Can\'t find registers of {{ camelCase name }}s',
                })
            }

        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = {
    test,
    getAll
}
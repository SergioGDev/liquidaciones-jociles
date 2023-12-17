const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {{ pascalCase name }}Schema = Schema({
    name: {
        type: String,
        require: true
    },
    otherOption: {
        type: String,
        require: false
    },
})

module.exports = mongoose.model('{{ pascalCase name }}', {{ pascalCase name }}Schema);

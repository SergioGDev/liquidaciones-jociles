const express = require('express')
const {{ pascalCase name }}sController = require('./{{ camelCase name }}s.controller')

const api = express.Router()

// const md_auth = require('../..//middlewares/authenticated')

api.get('/{{ kebabCase name }}s', {{ pascalCase name }}sController.getAll)
api.get('/{{ kebabCase name }}s/test', {{ pascalCase name }}sController.test)
// api.get('/{{ kebabCase name }}', [md_auth.ensureAuth], {{ pascalCase name }}sController.getAll)

module.exports = api
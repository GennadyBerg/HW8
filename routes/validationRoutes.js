const express = require('express');
const validationRoutes = express.Router();
const validator= require('../Validation/unifyValidator');
const recordCreateSchema = require('../Validation/objValidationSchemas');
const { validateObject } = require('../controllers/validationController');

validationRoutes.post('/validateObject', validator(recordCreateSchema), validateObject);

module.exports = validationRoutes;

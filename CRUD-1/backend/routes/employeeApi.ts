export {}

const express = require('express');
const router = express.Router();

const { createEmployee } = require('../controllers/createEmployee');
const { getEmployee, getEmployeeById } = require('../controllers/getEmployee');
const updateEmployee = require('../controllers/updateEmployee');
const { deleteEmployee } = require('../controllers/deleteEmployee');


router.post('/createEmployee', createEmployee)

router.get('/getEmployee', getEmployee)

router.get('/getEmployeeById/:id', getEmployeeById)

router.put('/updateEmployee/:id', updateEmployee)

router.delete('/deleteEmployee/:id', deleteEmployee)


module.exports = router
const express = require('express')

const { createStudent, getStudent,updateStudent,deleteStudent } = require('../controllers/students')

const router = express.Router()


router.get('/:id', getStudent)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)


module.exports = router
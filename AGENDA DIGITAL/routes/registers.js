const express = require('express')

const { createRegister, getRegister,updateRegister,deleteRegister } = require('../controllers/registers')

const router = express.Router()


router.get('/:id', getRegister)
router.post('/', createRegister)
router.put('/:id', updateRegister)
router.delete('/:id', deleteRegister)


module.exports = router
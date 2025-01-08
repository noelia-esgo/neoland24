const express = require('express')
const authenticate = require('../middlewares/auth')

const { updateUser, deleteUser,getUser } = require('../controllers/users')

const router = express.Router()


router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)
router.get('/:id', authenticate, getUser)

module.exports = router
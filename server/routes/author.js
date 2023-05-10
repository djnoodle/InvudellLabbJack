const express = require('express')
const router = express.Router()
const controller = require('../controllers/authorController')

router.get('/all', async (req, res) => {
    return await controller.get(req, res)
})

router.post('/create', async (req, res) => {
    await controller.add(req, res)
})

router.delete('/delete/:id', async (req, res) => {
    await controller.remove(req, res)
})

module.exports = router

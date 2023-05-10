const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookController')

router.get('/all', async (req, res) => {
    return await controller.get(req, res)
})

router.post('/create', async (req, res) => {
    await controller.add(req, res)
})

router.delete('/delete/:id', async (req, res) => {
    await controller.remove(req, res)
})

router.put('/update/:id', async (req, res) => {
    await controller.update(req, res)
})

module.exports = router

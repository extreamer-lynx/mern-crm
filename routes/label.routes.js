const {Router} = require('express')
const Label = require('../models/Label')
const router = Router()

router.get('/',
    async (req, res) => {
        try {
            res.status(201).json(await Label.findOne())
        } catch (e) {
            res.status(500).json({ label: 'Test Label'})
        }
    })

module.exports = router
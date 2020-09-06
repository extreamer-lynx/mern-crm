const User = require("../models/User")
const auth = require("../middleware/auth.middleware")
const {Router} = require('express')
const router = Router()


router.post('/get', auth, async (req, res) => {
    try {
        const {name, tel, sName, email} = await User.findOne({_id: req.user.userId})
        res.status(201).json({name, tel, sName, email})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе'})
    }
})

router.post('/change', auth, async (req, res) => {
    try {

        let arr = {};
        for (let pair in req.body) {
            if (req.body[pair] !== "") {
                arr[pair] = req.body[pair]

            }
        }

        res.status(201).json(await User.update({_id: req.user.userId, $set: arr}))

    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе'})
    }
})

module.exports = router
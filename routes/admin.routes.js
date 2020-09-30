const Salles = require("../models/Salles");
const Categories = require("../models/Categories");
const Products = require("../models/Products")
const bodyParser = require('body-parser')

const {Router} = require('express')
const fileUpload = require('express-fileupload');
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const admin = require('../middleware/admin.middleware')



router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            if (user.role === "admin") {

                const token = jwt.sign(
                    {userId: user.id, role: user.role},
                    config.get('jwtSecret'),
                    {expiresIn: '7d'}
                )

                res.status(201).json({token, userId: user.id})
            } else {
                return res.status(400).json({message: 'У вас недостаточно привилегий'})
            }
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

router.post('/search', admin, async (req, res) => {
    try {

        await User.find({email: {"$regex": req.body.name, "$options": "i"}}, function (errs, result) {
            if (errs) {
                return res.status(500).send(errs);
            }

            return res.status(201).json(result);
        });
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе' + e})
    }
})

router.post('/delProfile', admin, async (req, res) => {
    try {
        await User.deleteOne({_id: req.body._id})
        res.status(201).json({message: "Профиль удален"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/changeProfile', admin, async (req, res) => {
    try {
        await User.updateOne({_id: req.body._id}, {role: req.body.role})
        res.status(201).json({message: "Роль изминена"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/changeSale', admin, async (req, res) => {
    try {
        await Salles.updateOne({_id: req.body._id}, {status: req.body.status})
        res.status(201).json({message: "Статус изминен"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/getSales', admin, async (req, res) => {
    try {
        res.status(201).json(await Salles.find().limit(10))
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/changeSale', admin, async (req, res) => {
    try {
        res.status(201).json(await Salles.updateOne({_id: req.body._id}, {status: req.body.status}))
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/getUserById', admin, async (req, res) => {
    try {
        res.status(201).json(await User.findById(req.body.id))
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/renameCategory', admin, async (req, res) => {
    try {
        await Categories.updateOne({_id: req.body.id}, {ruCategory: req.body.name})
        res.status(201).json({message: "Изминен"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/deleteCategory', admin, async (req, res) => {
    try {
        await Categories.deleteOne({_id: req.body.id})
        res.status(201).json({message: "Профиль удален"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/addCategory', admin, async (req, res) => {
    try {
        const cat = new Categories({ruCategory: req.body.name})
        cat.save();
        res.status(201).json({message: "Категория добавлена"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.post('/deleteProd', admin, async (req, res) => {
    try {
        await Categories.deleteOne({_id: req.body.id})
        res.status(201).json({message: "Товар удален"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

router.use('/addProd', fileUpload({
    createParentPath: true,
    debug: true
}));

const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/addProd', admin, urlencodedParser, async (req, res) => {
    try {
        //const cat = new Categories({ruName: req.body.name})
        //cat.save();
        console.log(req.files)
        res.status(201).json({message: "Продукт добавлена"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе ' + e})
    }
})

module.exports = router
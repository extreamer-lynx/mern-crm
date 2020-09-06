const Category = require("../models/Categories")
const Product = require("../models/Products")
const Salles = require("../models/Salles")
const auth = require("../middleware/auth.middleware")
const {Router} = require('express')
const router = Router()

router.post('/categories', async (req, res) => {
    try {
        res.status(201).json(await Category.find())
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе'})
    }
})

router.post('/topProducts', async (req, res) => {
    try {
        res.status(201).json(await Product.find().limit(10))
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе' + e})
    }
})

router.post('/search', async (req, res) => {
    try {
        //res.status(201).json(await Product.find({name:req.query.name}))
       await Product.find( {name: { "$regex": req.body.name, "$options": "i" }} , function(errs, books){
            if(errs){
                return res.status(500).send(errs);
            }

           return res.status(201).json(books);
        });
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе' + e})
    }
})

router.post('/product', async (req, res) => {
    try {
        res.status(201).json(await Product.findById(req.body.id))
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе' + e})
    }
    })

router.post('/buy', auth, async (req, res) => {
    try {
        const Sale = new Salles({products: req.body.product, user: req.user.userId})
        Sale.save();
        res.status(201).json({message: "Заказ сделан"})
    } catch (e) {
        res.status(500).json({message: 'Ошибка в выполнении запроса' + e})
    }
})

router.post('/getSales', auth , async (req, res) => {
    try {
        res.status(201).json(await Salles.find({user: req.user.userId}))
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе' + e})
    }
})

router.post('/byCategory', async (req, res) => {
    try {
        res.status(201).json(await Product.find({ categories: { $in: [req.body.category] }}))
    } catch (e) {
        res.status(500).json({message: 'Ошибка в запросе' + e})
    }
})

module.exports = router
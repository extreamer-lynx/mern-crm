const Category = require("../models/Categories")
const Product = require("../models/Products")

const {Router} = require('express')
const {check, validationResult} = require('express-validator')
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
       await Product.find( {name: { "$regex": req.query.name, "$options": "i" }} , function(errs, books){
            if(errs){
                res.status(500).send(errs);
            }

           res.status(201).json(books);
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


module.exports = router
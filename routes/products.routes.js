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

router.get('/search', async (req, res) => {
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


/*
*2020-08-12T11:57:04.460+00:00
        await (new Product({name:"FENDER FA-235E CONCERT NATURAL LR",
        cost: 9730,
        description: "FENDER FA-235E CONCERT NATURAL LR имеет гриф из нато с накладкой из лаурели. Количество ладов - 20. Верхняя дека сделана из ламинированного клена, обечайка и нижняя дека изготовлены из ламинированного махагони. Инструмент оснащен темброблоком и звукоснимателем Fishman. Мензура гитары составляет 25.3\" (643 мм). Гитара под правую руку музыканта.",
        count: 5,
        categories:"5f33d28a7cf65f0588b6fc7d",
        params:{
            "Тип": "Електроакустика"
        },
        images: {
            main: "main.png"
        }})).save()
        * */

module.exports = router
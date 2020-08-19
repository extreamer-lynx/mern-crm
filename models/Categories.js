const {Schema, model} = require('mongoose')

const Category = new Schema({
    category: String,
    ruCategory: String
})

module.exports = model('Category', Category)
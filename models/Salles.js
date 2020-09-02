const {Schema, model} = require('mongoose')

const Salles = new Schema({
    products: [],
    date: {type: Date, default: Date.now, index: true},
    user: {type: String, index: true},
    status: {type: Boolean, default: false}
})

module.exports = model('Salles', Salles)
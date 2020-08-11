const {Schema, model} = require('mongoose')

const schema = new Schema({
    label: {type: String, required: true, unique: true},
})

module.exports = model('Label', schema)

const {Schema, model} = require('mongoose')

const Product = new Schema({
    name: String,
    cost: Number,
    description: String,
    count: {type: Number, default: 0},
    date: {type: Date, default: Date.now, index: true},
    categories : [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    params: {type: [Schema.Types.Mixed], default: null},
    images: [Schema.Types.Mixed]
})

module.exports = model('Product', Product)
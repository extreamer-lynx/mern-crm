const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: String,
  sName: String,
  tel: String
})

module.exports = model('User', schema)

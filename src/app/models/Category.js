const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
      type: String,
      required: [true, "Please add your category"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."]
    }
  }, {
    timestamps: true
  })

module.exports = mongoose.model('categorys', CategorySchema)
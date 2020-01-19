const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const { Schema, model } = mongoose

const newsSchema = new Schema({
  title: {
    type: String, 
    required: [true, 'Name must be required'],
    unique: true
  },
  status: {
    type: String,
    default: 'draft'
  },
  content: {
    type: String,
    required: [true, 'Content must be required']
  },
  topic: {
    type: String,
    required: [true, 'Topic must be required']
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }]
}, { timestamps: true, versionKey: false })

newsSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} News already exist' });

const News = model('News', newsSchema)
module.exports = News
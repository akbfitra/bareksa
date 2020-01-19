const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const { Schema, model } = mongoose

const tagSchema = new Schema({
  name : {
    type: String,
    required: [ true, 'Name Tag must be required' ],
    unique: true
  }
}, { timestamps: true, versionKey: false })

tagSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} Tag already exist' });

const Tag = model('Tag', tagSchema)
module.exports = Tag

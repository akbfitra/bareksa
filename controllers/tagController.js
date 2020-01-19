const Tag = require('../models/tag')
const mongoose = require('mongoose');

class TagController{
  static async create(req, res, next){
    try{
      const { name } = req.body
      const created = await Tag.create({ name })
      res.status(201).json(created)
    }
    catch(err){
      next(err)
    }
  }

  static async findAll(req, res, next){
    try{
      const dataTags = await Tag.find()
      res.status(200).json(dataTags)
    }
    catch(err){
      next(err)
    }
  }

  static async findOne(req, res, next){
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) next({status: 404, msg: 'Data Tag Not Found'})
    try{
      
      const dataTag = await Tag.findById(id)
      res.status(200).json(dataTag)
    }
    catch(err){
      next(err)
    }
  }

  static async delete(req, res, next){
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) next({status: 404, msg: 'Data Tag Not Found'})
    try{
      const deleted = await Tag.findByIdAndRemove(id)
      res.status(200).json(deleted)
    }
    catch(err){
      next(err)
    }
  }

  static async update(req, res, next){
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) next({status: 404, msg: 'Data Tag Not Found'})
    try{
      const {name} = req.body
      const updated = await Tag.findByIdAndUpdate(id, { name }, { runValidators: true, new: true , context: 'query' })
      res.status(200).json(updated)
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = TagController
const Tag = require('../models/tag')

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
      res.status(201).json(dataTags)
    }
    catch(err){
      next(err)
    }
  }

  static async findOne(req, res, next){
    try{
      const { id } = req.params
      const dataTag = await Tag.findById(id)
      res.status(200).json(dataTag)
    }
    catch(err){
      next(err)
    }
  }

  static async delete(req, res, next){
    try{
      const { id } = req.params
      const deleted = await Tag.findByIdAndRemove(id)
      res.status(200).json(deleted)
    }
    catch(err){
      next(err)
    }
  }

  static async update(req, res, next){
    try{
      const name = req.body
      const updated = await Tag.findByIdAndUpdate(id, { name })
      res.status(200).json(updated)
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = TagController
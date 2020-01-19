const News = require('../models/news.js')

class NewsController{
  static async create(req, res, next){
    try{
      const { title, content, status, topic, tags } = req.body
      let created = await News.create({ title, content, status, topic, tags })
      res.status(201).json(created)
    }
    catch(err){
      next(err)
    }
  }

  static async findAll(req, res, next){
    try{
      const dataNews = await News.find().populate('tags')
      res.status(200).json(dataNews)
    }
    catch(err){
      next(err)
    }
  }

  static async findOne(req, res, next){
    try{
      const { id } = req.params
      const dataById = await News.findById(id).populate('tags')
      res.status(200).json(dataById)
    }
    catch(err){
      next(err)
    }
  }

  static async filter(req, res, next){
    try{
      const { topic, tag, status } = req.query
      const filter = {}
      if( topic ) filter.topic =  new RegExp(`${topic}`, 'gi') 
      if( tag ) filter.tags =  tag 
      if( status ) filter.status = status 

      const dataFilter = await News.find(filter).populate('tags')
      res.status(200).json(dataFilter)
    }
    catch(err){
      next(err)
    }
  }

  static async update(req, res, next){
    try{
      const { id } = req.params
      const fields = ['title', 'content', 'status', 'tags']
      const update = {}
      for(let key in req.body){
        fields.forEach(el => {
          if(key === el){
            update[key] = req.body[key]
          }
        });
      }
      const updated = await News.findByIdAndUpdate(id, update)
      res.status(200).json(updated)
    }
    catch(err){
      next(err)
    }
  }

  static async updateStatus(req, res, next){
    try{
      const { id } = req.params
      const { status } = req.body
      const updateStatus = await News.findByIdAndUpdate(id, { status })
      res.status(200).json(updateStatus)
    }
    catch(err){
      next(err)
    }
  }

  static async delete(req, res, next){
    try{
      const { id } = req.params
      const deleted = await News.findByIdAndRemove(id)
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = NewsController
const mongoose = require('mongoose')
const NODE_ENV = process.env.NODE_ENV

let db = NODE_ENV ? `mongodb://localhost:27017/bareksa-${NODE_ENV}`: process.env.MONGO_CONNECT

// const MONGO_CONNECT = process.env.MONGO_CONNECT

mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log(db, `Mongodb Connected`)
  })
  .catch(err => {
    console.log(err)
    console.log(`Mongodb Connect Fail`)
  })

module.exports = mongoose
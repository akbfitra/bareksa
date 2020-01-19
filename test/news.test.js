const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app.js')
const News = require('../models/news.js')
const Tag = require('../models/tag.js')

chai.use(chaiHTTP)

let newsId
let tagId

after(function(done){
  if(process.env.NODE_ENV === 'testing'){
    News.deleteMany({})
      .then( data => {
        console.log('database News was deleted')
        
        Tag.deleteMany({})
        .then(data => {
          console.log('database Tag was deleted')
          done()
        })
        .catch(err => {
          console.log(err)
        })
        
      })
      .catch(err => {
        console.log(err)
      })
  }
})

before(function (done){
  if(process.env.NODE_ENV === 'testing'){
    Tag.create({ name: 'invest'})
      .then( data => {
        tagId = data._id
        done()
      })
      .catch(err => {
        console.log(err)
      })
  }
})

describe('News Testing', () => {
  describe('News Create Testing (POST) /news', () => {
    describe('success testing', () => {
      it('should create data news with status(201) and send object(title, content, topic, tags, status)', (done) => {
        let data = {
          title: 'investment for young',
          content: 'The Thrift Savings Plan for retirement savings mirrors index funds that invest in such stocks. There’s a fix.',
          topic: 'investment',
          tags: tagId
        }
        chai.request(app)
          .post('/news')
          .send(data)
          .end((err, res) => {
            newsId = res.body._id
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'title', 'content', 'topic', 'tags','status', 'createdAt', 'updatedAt')
            const { title, content, topic } = res.body
            expect(title).to.equal(data.title)
            expect(content).to.equal(data.content)
            expect(topic).to.equal(data.topic)
            done()
          })
      })
    })
    describe('error testing', () =>{
      it('should send an error with status (400) and send object error with message title is required', (done) => {
        let data = {
          content: 'The Thrift Savings Plan for retirement savings mirrors index funds that invest in such stocks. There’s a fix.',
          topic: 'investment',
          tags: tagId
        }
        chai.request(app)
          .post('/news')
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Name Title must be required')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message content is required', (done) => {
        let data = {
          title: 'investment for young 3',
          topic: 'investment',
          tags: tagId
        }
        chai.request(app)
          .post('/news')
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Content must be required')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message topic is required', (done) => {
        let data = {
          title: 'investment for young 4',
          content: 'The Thrift Savings Plan for retirement savings mirrors index funds that invest in such stocks. There’s a fix.',
          tags: tagId
        }
        chai.request(app)
          .post('/news')
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Topic must be required')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message title, topic, content is required', (done) => {
        let data = {
          tags: tagId
        }
        chai.request(app)
          .post('/news')
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Name Title must be required', 'Content must be required','Topic must be required')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message title is already exist', (done) => {
        let data = {
          title: 'investment for young',
          content: 'The Thrift Savings Plan for retirement savings mirrors index funds that invest in such stocks. There’s a fix.',
          topic: 'investment',
          tags: tagId
        }
        chai.request(app)
          .post('/news')
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Error, expected title News already exist')
            done()
          })
      })
    })
  })
  describe('Get All News Testing (GET) /news', () => {
    describe('success testing', () => {
      it('should get data news with status(200) and send array of object with key (title, content, topic, tags, status)', (done) => {
        chai.request(app)
          .get('/news')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.be.an('object').that.all.have.keys('_id', 'title', 'content', 'topic', 'tags', 'status','createdAt', 'updatedAt')
            done()
          })
      })
    })
  })
  describe('Get All News Testing (GET) /news/:id', () => {
    describe('success testing', () => {
      it('should get data news with status(200) and send array of object with key (title, content, topic, tags, status)', (done) => {
        chai.request(app)
          .get(`/news/${newsId}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).that.all.have.keys('_id', 'title', 'content', 'topic', 'tags', 'status','createdAt', 'updatedAt')
            done()
          })
      })
    })
    describe('error testing', () => {
      it('should get error with status(404) and send object with message data news not found', (done) => {
        chai.request(app)
          .get(`/news/5e23f61463491623d194faf`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.includes('Data News Not Found')
            done()
          })
      })
    })
  })
  describe('Update Data News Testing (PUT) /news/:id', () => {
    describe('success testing', () => {
      it('should get data news with status(200) and send object with key (title, content, topic, tags, status', (done) => {
        let data = {
          title: 'investment',
          content: 'test',
          topic: 'investment',
          status: 'deleted',
          tags: tagId
        }
        chai.request(app)
          .put(`/news/${newsId}`)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'title', 'content', 'topic', 'tags','status', 'createdAt', 'updatedAt')
            done()
          })
      })
    })
    describe('error testing', () => {
      it('should send an error with status (400) and send object error with message title is required', (done) => {
        let data = {
          title: '',
          content: 'The Thrift Savings Plan for retirement savings mirrors index funds that invest in such stocks. There’s a fix.',
          topic: 'investment',
          tags: tagId
        }
        chai.request(app)
          .put(`/news/${newsId}`)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Name Title must be required')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message content is required', (done) => {
        let data = {
          title: 'investment',
          content: '',
          topic: 'investment',
          tags: tagId
        }
        chai.request(app)
          .put(`/news/${newsId}`)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Content must be required')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message topic is required', (done) => {
        let data = {
          title: 'investment',
          content: 'new investment',
          topic: '',
          tags: tagId
        }
        chai.request(app)
          .put(`/news/${newsId}`)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Topic must be required')
            done()
          })
      })
      it('should get error with status(404) and send object with message data news not found', (done) => {
        chai.request(app)
          .put(`/news/5e23f61463491623d19af`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.includes('Data News Not Found')
            done()
          })
      })
    })
  })
  describe('Update Data Status News Testing (PATCH) /news/:id', () => {
    describe('success testing', () => {
      it('should get data news with status(200) and send object with key (title, content, topic, tags, status', (done) => {
        let data = {
          status: 'publish'
        }
        chai.request(app)
          .patch(`/news/${newsId}`)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'title', 'content', 'topic', 'tags','status', 'createdAt', 'updatedAt')
            done()
          })
      })
    })
    describe('error testing', () => {
      it('should get error with status(404) and send object with message data news not found', (done) => {
        chai.request(app)
          .patch(`/news/5e23f61463491623d19af`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.includes('Data News Not Found')
            done()
          })
      })
    })
  })
  describe('Delete Data  News Testing (DELETE) /news/:id', () => {
    describe('success testing', () => {
      it('should get data news with status(200) and send object with key (title, content, topic, tags, status', (done) => {
        chai.request(app)
          .delete(`/news/${newsId}`)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'title', 'content', 'topic', 'tags','status', 'createdAt', 'updatedAt')
            done()
          })
      })
    })
    describe('error testing', () => {
      it('should get error with status(404) and send object with message data news not found', (done) => {
        chai.request(app)
          .delete(`/news/5e23f61463491623d19af`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.includes('Data News Not Found')
            done()
          })
      })
    })
  })
})

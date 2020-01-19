const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app.js')
const Tag = require('../models/tag.js')

chai.use(chaiHTTP)

let tagId

after(function(done){
  if(process.env.NODE_ENV === 'testing'){
    Tag.deleteMany({})
      .then( data => {
        console.log('database Tag was deleted')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  }
})

describe('Tag Testing', () => {
  describe('Tag Create Testing (POST) /tag', () => {
    describe('success testing', () => {
      it('should create data tag with status(201) and send object(name)', (done) => {
        let data = {
          name: 'bareksa'
        }
        chai.request(app)
          .post('/tag')
          .send(data)
          .end((err, res) => {
            tagId = res.body._id
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'name', 'createdAt', 'updatedAt')
            const { name } = res.body
            expect(name).to.equal(data.name)
            done()
          })
      })
    })
    describe('error testing', () =>{
      it('should send an error with status (400) and send object error with message name is required', (done) => {
        let data = { }
        chai.request(app)
          .post('/tag')
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Name Tag must be required')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message name is already exist', (done) => {
        let data = {
          name: 'bareksa'
        }
        chai.request(app)
          .post('/tag')
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Error, expected name Tag already exist')
            done()
          })
      })
    })
  })
  describe('Get All Tags Testing (GET) /tag', () => {
    describe('success testing', () => {
      it('should get data tag with status(200) and send array of object with key (name)', (done) => {
        chai.request(app)
          .get('/tag')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.be.an('object').that.all.have.keys('_id', 'name','createdAt', 'updatedAt')
            done()
          })
      })
    })
  })
  describe('Get All Tag Testing (GET) /tag/:id', () => {
    describe('success testing', () => {
      it('should get data tag with status(200) and send array of object with key (name)', (done) => {
        chai.request(app)
          .get(`/tag/${tagId}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).that.all.have.keys('_id', 'name', 'createdAt', 'updatedAt')
            done()
          })
      })
    })
    describe('error testing', () => {
      it('should get error with status(404) and send object with message data tag not found', (done) => {
        chai.request(app)
          .get(`/tag/5e23f61463491623d194faf`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.includes('Data Tag Not Found')
            done()
          })
      })
    })
  })
  describe('Update Data Status Tag Testing (PUT) /tag/:id', () => {
    describe('success testing', () => {
      it('should get data tag with status(200) and send object with key (name)', (done) => {
        let data = {
          name: 'bareksainvest'
        }
        chai.request(app)
          .put(`/tag/${tagId}`)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'name', 'createdAt', 'updatedAt')
            done()
          })
      })
    })
    describe('error testing', () => {
      it('should get error with status(404) and send object with message data tag not found', (done) => {
        chai.request(app)
          .put(`/tag/5e23f61463491623d19af`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.includes('Data Tag Not Found')
            done()
          })
      })
      it('should send an error with status (400) and send object error with message name is required', (done) => {
        let data = {
          name: ''
        }
        chai.request(app)
          .put(`/tag/${tagId}`)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('array').to.be.includes('Name Tag must be required')
            done()
          })
      })
    })
  })
  describe('Delete Data Tag Testing (DELETE) /tag/:id', () => {
    describe('success testing', () => {
      it('should get data tag with status(200) and send object with key (name)', (done) => {
        chai.request(app)
          .delete(`/tag/${tagId}`)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'name', 'createdAt', 'updatedAt')
            done()
          })
      })
    })
    describe('error testing', () => {
      it('should get error with status(404) and send object with message data tag not found', (done) => {
        chai.request(app)
          .delete(`/tag/5e23f61463491623d19af`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.includes('Data Tag Not Found')
            done()
          })
      })
    })
  })
})
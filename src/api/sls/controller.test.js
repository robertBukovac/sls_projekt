const request = require('supertest')
const Controller = require('./controller');
const app = require('../../app')


describe('Stake Limit Service Controller test ', () => {
    it('should return 200 & return array of sls or empty array', async done => {
      request(app)
        .get(`/api/v1/sls`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toMatchObject({message: 'All the Stake limit services you want !',status:true,data:{}})
          done()
        })
    })
    it('should return 200 & return a sls', async done => {
        request(app)
          .get(`/api/v1/sls/1`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.body).toMatchObject({message: 'The Stake limit services you want !',status:true,data:{}})
            done()
          })
      })
    it('should return 201 & aaa valid response for sls', async done => {
        request(app)
        .put(`/api/v1/sls/1`)
        .send({
            timeDuration: 15,
        })
        .expect(201)
        .end(function(err, res) {
            if (err) return done(err)
            expect(res.body).toMatchObject({status:true,data:{},message: "Sls successfully updated !"})
            done()
        })
    })
    it('should return 201 & bbb valid response for sls', async done => {
        request(app)
        .delete(`/api/v1/sls/2`)
        .expect(201)
        .end(function(err, res) {
            if (err) return done(err)
            expect(res.body).toMatchObject({status:true,data:{},message: "Sls succesfully deleted"})
            done()
        })
    })
    it('should return 201 & ccc  valid response for sls', async done => {
        request(app)
        .post(`/api/v1/sls`)
        .send({
            timeDuration : 10,
            stakeLimit : 900,
            hotPercentage : 75,
            restrictionExpires : 15,
            deviceId : '2ceac662-9d52-4ddd-bf05-7ec04818615e'
        })
        .expect(201)
        .end(function(err, res) {
            if (err) return done(err)
            expect(res.body).toMatchObject({status:true,data:{},message: 'Sls successfully created !'})
            done()
        })
    })
})


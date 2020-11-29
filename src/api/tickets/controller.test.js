const request = require('supertest')
const Controller = require('./controller');
const app = require('../../app')

describe('GET /api/v1/tickets', () => {
    it('should return 200 & return array of tickets or empty array', async done => {
      request(app)
        .get(`/api/v1/tickets`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toMatchObject({status:true})
          done()
        })
    })
    it('should return 200 & valid response if name param is set', async done => {
        request(app)
          .get(`/api/v1/tickets/d4fd00bc-df60-42f9-b1e4-96aaf67b5b55`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.body).toMatchObject({status:true,data:{}})
            done()
          })
      })
    it('should return 201 & valid response for ticket', async done => {
      try{
    request(app)
      .post(`/api/v1/tickets`)
      .send({
        stake: 50,
        deviceId: '3c144f2f-bc35-4ecd-8fa3-b2a9f012c284'
      })
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err)
        expect(res.body).toMatchObject({status: `OK`,data:{}})
        done()
      })}
      catch(e) {
        // have to manually handle the failed test with "done.fail"
       done.fail(e)
      }
  })
    it('should return 404 & Please enter valid amount for ticket', async done => {
      try{
        request(app)
        .post(`/api/v1/tickets`)
        .send({
            stake: 0.5,
            deviceId: '3c144f2f-bc35-4ecd-8fa3-b2a9f012c284'
        })
        .expect(500)
        .end(function(err, res) {
            if (err) return done(err)
            done()
        })}
        catch(e) {
          // have to manually handle the failed test with "done.fail"
         done.fail(e)
        }
    })
})


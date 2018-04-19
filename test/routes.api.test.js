process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const server = require('../src/server/index')


describe('GET /api/v1/apt_validity_check/:ds_id/:date', () => {

  it('valid APT', (done) => {
    chai.request(server)
      .get('/api/v1/apt_validity_check/12345/1978-12-20')
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.status.should.eql('valid')
        res.body.data.length.should.eql(1)
        res.body.data[0].should.include.keys(
          'ds_id',
          'siret',
          'prenom',
          'nom',
          'date_de_naissance',
          'has_expired',
          'date_de_debut_apt',
          'date_de_fin_apt',
        )
        done()
      })
  })

  it('invalid APT', (done) => {
    chai.request(server)
      .get('/api/v1/apt_validity_check/0000000000/0000-00-00')
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.status.should.eql('invalid')
        res.body.data.length.should.eql(0)
        done()
      })
  })

})

const chai = require('chai')
const http = require('chai-http')

chai.use(http)

let should = chai.should()

const base = 'http://localhost:3030'

describe('/POST warehouse', _ => {
  it('should create a new warehouse', done => {
    let warehouse = {
      "type": "store",
      "address":{  
      "street": "obras urbanas",
   	      "city": "xalaapavavasara",
   	      "state": "veracruz",
   	      "zipcode": 123,
   	      "country": "mexico",
   	      "geopoint": {
   	      "latitude": 12312321,
   	      "longitude": 685249
   	    }
      },
      "stock": []
    }

    chai.request(base)
      .post('/admin/api/v1/warehouses')
      .send(warehouse)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.have.a('object')
        res.body.should.have.property('data')
        done()
      })
  })
})


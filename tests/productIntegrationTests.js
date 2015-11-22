var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    agent = request.agent(app);

describe('Product Crud Test', function () {
    it('Should allow a product to be posted and return a read and _id', function (done) {
        var productPost = {name: 'Spaghetti', price: 3.70, category: 'Pasta'};

        agent.post('/api/products')
            .send(productPost)
            .expect(200)
            .end(function(err,result) {
                result.body.category.should.equal('Pasta');
                result.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function (done) {
        Product.remove().exec();
        done();
    });

});
var should = require('should'),
    sinon = require('sinon');

describe('Product Controller Tests', function(){
    describe('Post', function(){
        it('should not allow an empty name on post', function () {
            var Product = function (product) {this.save = function(){}};
            var req = {
                body: {
                    price: 3.70,
                    category: 'Salads'
                }
            };
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var productController = require('../controllers/productController')(Product);
            productController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Name is required').should.equal(true);
        });
    });
});
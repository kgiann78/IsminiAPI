var express = require('express');

var routes = function (Product) {
    var productRouter = express.Router();
    var productController = require('../controllers/productController')(Product);

    productRouter.route('/')
        .post(productController.post)
        .get(productController.get);

    /*
        create middleware in order to
        keep router functions simple
        "Next" is used to move to the next method
        (now productRouter.route('/:productId'))
        that follows after current middleware
        and after that has finish its execution
    */
    productRouter.use('/:productId', function(req, res, next){
        Product.findById(req.params.productId, function (err, product) {
            if (err)
                res.status(500).send(err);
            else if (product) {
                req.product = product;
                next();
            }
            else {
                res.status(404).send('no product found');
            }
        });
    });
    productRouter.route('/:productId')
        .get(function (req, res) {
            var returnProduct = req.product.toJSON();
            returnProduct.links = {};
            var categoryLink = 'http://' + req.headers.host + '/api/products/?category=' + returnProduct.category;
            returnProduct.links.FilterByCategory = categoryLink.replace(' ', '%20');
            res.json(returnProduct);
        })
        /* replace the whole entry */
        .put(function (req, res) {
            req.product.name = req.body.name;
            req.product.price = req.body.price;
            req.product.category = req.body.category;
            req.product.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.product);
            });
        })
        /* updates a value (parameter) of the entry */
        .patch(function (req, res) {
            /* remove the id from the list of parameters */
            if (req.body._id)
                delete req.body._id;

            /*
             loop into the parameters of the body
             and if any of them is different
             pass it to the product object
             */
            for (var p in req.body) {
                req.product[p] = req.body[p];
            }
            req.product.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.product);
            });
        })
        .delete(function (req, res) {
            req.product.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });

    return productRouter;
};

module.exports = routes;
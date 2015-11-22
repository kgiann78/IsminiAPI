var productController = function(Product) {

    var post = function (req, res) {
        var product = new Product(req.body);
        console.log(product);
        if (!req.body.name) {
            res.status(400);
            res.send('Name is required');
        } else {
            /*
             we need to separate
             status from send
             */
            product.save();
            res.status(200);
            res.send(product);
        }
    };

    var get = function (req, res) {
        /*filtering*/
        var query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }

        Product.find(query, function (err, products) {
            if (err)
                res.status(500).send(err);
            else {
                var returnProducts = [];
                products.forEach(function (element, index, array) {
                    var newProduct = element.toJSON();
                    //console.log(JSON.stringify(newProduct));
                    newProduct.links = {};
                    newProduct.links.self = 'http://' + req.headers.host + '/api/products/' + newProduct._id;
                    returnProducts.push(newProduct);
                });
                res.json(returnProducts);
            }
        });
    };

    return {
        post: post,
        get : get
    };
};

module.exports = productController;
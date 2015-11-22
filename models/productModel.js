var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productModel = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('Product', productModel);
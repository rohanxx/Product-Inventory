const mongoose = require('mongoose');
const Joi = require('joi');

const Product = mongoose.model('Product', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    metaInfo: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    frameRate: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}));

function validate(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        shortDescription: Joi.string().required(),
        description: Joi.string().required(),
        metaInfo: Joi.string().required(),
        size: Joi.number().required(),
        os: Joi.string().required(),
        quality: Joi.string().required(),
        frameRate: Joi.number().required(),
        price: Joi.number().required()
    });

    return schema.validate(product);
}

module.exports.Product = Product;
module.exports.validate = validate;

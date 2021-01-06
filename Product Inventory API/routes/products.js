const express = require('express');
const router = express.Router();
const{ Product, validate } = require('../models/product');
const _ = require('lodash');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().exec();
        if (!products) return res.status(404).send('No product found');
    
        res.json({
            status: 200,
            data: products
        });
    }
    catch(ex) {
        res.json({
            status: 500,
            message: ex.message
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).exec();
        if (!product) return res.status(404).send('No product found');
        res.json({
            status: 200,
            data: _.pick(product, ['name', 'shortDescription', 'description', 'metaInfo', 'size', 'os', 'quality', 'frameRate', 'price'])
        });
    }
    catch(ex) {
        res.json({
            status: 500,
            message: ex.message
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body); 
        if(error) return res.status(400).send(error.details[0].message);

        let product = new Product({
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            metaInfo: req.body.metaInfo,
            size: req.body.size,
            os: req.body.os,
            quality: req.body.quality,
            frameRate: req.body.frameRate,
            price: req.body.price
        });

        product = await product.save();
       
        res.json({
            status: 200,
            data: product
        });
    }
    catch(ex) {
        res.json({
            status: 500,
            message: ex.message
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).exec();
        if(!product) return res.status(404).send('No product found');

        product.set(
            _.pick(req.body, ['name','shortDescription', 'description', 'metaInfo', 'size', 'os', 'quality', 'frameRate', 'price' ])
        );

        await product.save();

        res.json({
            status: 200,
            data: product
        });
    }
    catch(ex) {
        res.json({
            status: 500,
            message: ex.message
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Product.findByIdAndRemove(req.params.id).exec();
       
        res.json({
            status: 200,
            data: result
        });
    }
    catch(ex) {
        res.json({
            status: 500,
            message: ex.message
        })
    }
});

module.exports = router;
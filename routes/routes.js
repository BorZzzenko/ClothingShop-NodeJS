const express = require('express');
const router = express.Router();
const Clothes = require('../models/clothes');
const Color = require('../models/color');
const Category = require('../models/category');

// Clothes catalog
router.get("/", async (req, res) => {
    try {
        const allClothes = await Clothes.find();

        res.render('index.html', {
            clothes: allClothes
        });
    } catch (err) {
        res.json({message: err});
    }
});

// Clothes info
router.get("/product/:id", async (req, res) => {
    try {
        const clothes = await Clothes.findById(req.params.id);
        const color = await Color.findOne({id: clothes.color_id});
        const category = await Category.findOne({id: clothes.category_id});

        res.render('clothes_info.html', {
            clothes: clothes,
            color: color,
            category: category,
        });
    } catch (err) {
        res.json({message: err});
    }
    
});

module.exports = router;
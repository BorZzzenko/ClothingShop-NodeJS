const express = require('express');
const router = express.Router();
const Clothes = require('../models/clothes');
const Color = require('../models/color');
const Category = require('../models/category');

// Clothes catalog
router.get('/', async (req, res) => {
    try {
        const allClothes = await Clothes.find();

        res.render('index.html', {
            clothes: allClothes
        });
    } catch (err) {
        res.json({message: err});
    }
});

// Clothes catalog admin
router.get('/admin', async (req, res) => {
    try {
        const allClothes = await Clothes.find();

        res.render('admin.html', {
            clothes: allClothes
        });
    } catch (err) {
        res.json({message: err});
    }
});

// Clothes info
router.get('/product/:id', async (req, res) => {
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

// Clothes creation form rendering
router.get('/create', async (req, res) => {
    try {
        const colors = await Color.find();
        const categories = await Category.find();

        res.render('create_clothes.html', {
            title: 'Новая одежда',
            colors: colors,
            categories: categories,
        });
    } catch (err) {
        res.json({message: err});
    }
});

// Create clothes
router.post('/create', async (req, res) => {
    const clothes = new Clothes({
        name: req.body.name,
        category_id: req.body.category_id,
        color_id: req.body.color_id,
        price: req.body.price,
        sizes: req.body.sizes,
        description: req.body.description,
        imagePath: req.body.imagePath
    });

    try {
        await clothes.save();
        res.redirect('/admin');
    } catch (err) {
        res.json({message: err});
    }
});

// Clothes updating form rendering
router.get('/update/:id', async (req, res) => {
    try {
        const clothes = await Clothes.findById(req.params.id);
        const colors = await Color.find();
        const categories = await Category.find();

        res.render('create_clothes.html', {
            title: 'Изменение информации об одежде',
            clothes: clothes,
            colors: colors,
            categories: categories,
        });
    } catch (err) {
        res.json({message: err});
    }
});

// Update clothes
router.post('/update/:id', async (req, res) => {
    try {
        let clothes = await Clothes.findById(req.params.id);

        clothes.name = req.body.name;
        clothes.category_id = req.body.category_id;
        clothes.color_id = req.body.color_id;
        clothes.price = req.body.price;
        clothes.sizes = req.body.sizes;
        clothes.description = req.body.description;
        clothes.imagePath = req.body.imagePath;

        await clothes.save();
        res.redirect('/admin');
    } catch (err) {
        res.json({message: err});
    }
});

// Delete clothes
router.post('/delete/:id', async (req, res) => {
    try {
        await Clothes.deleteOne({_id: req.params.id});
        res.redirect('/admin');
    } catch {
        res.json({message: err});
    }
});

module.exports = router;
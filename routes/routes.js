const express = require('express');
const router = express.Router();
const Clothes = require('../models/clothes');

// Clothes catalog
router.get("/", async (req, res) => {
    const allClothes = await Clothes.find();
    res.render('index.html', {
        clothes: allClothes
    });
});

module.exports = router;
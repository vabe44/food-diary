const express = require('express');
const router = express.Router();
const mw = require("../middlewares");
const m = require("../models");

/* GET FOOD PAGE */
router.get('/', mw.asyncMiddleware(async (req, res, next) => {
    const foods = await m.Food.findAll();
    res.render('food/index', { foods });
}));

/* SHOW ADD NEW FOOD */
router.get('/new', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {
    res.render('food/new');
}));

/* POST NEW FOOD */
router.post('/new', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {
    await m.Food.create({
        name: req.body.name,
        image: req.body.image,
        source: req.body.source,
        notes: req.body.notes,
    });
    req.flash("success", "Kaja elmentve");
    res.redirect('back');
}));

/* GET FOOD EDIT PAGE */
router.get("/edit/:id", mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {
    const food = await m.Food.findById(req.params.id);
    res.render('food/edit', { food });
}));

/* PUT FOOD */
router.put("/:id", mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {
    const food = await m.Food.findById(req.params.id);
    await food.update({
        name: req.body.name,
        image: req.body.image,
        source: req.body.source,
        notes: req.body.notes,
    });
    res.redirect('back');
}));

/* DELETE FOOD */
router.delete('/:id', mw.isLoggedIn, mw.asyncMiddleware(async (req, res, next) => {
    const food = await m.Food.findById(req.params.id);
    await food.destroy();
    res.redirect('/');
}));

module.exports = router;
const express = require('express');
const router = express.Router();
const { Messages } = require('../models');

router.get('/', async (req, res) => {
    const listOfPosts = await Messages.findAll()
    res.json(listOfPosts)
})

router.post("/", async (req, res) => {
    const message = req.body
    await Messages.create(message);

    res.json(message)
})

module.exports = router
const express = require('express')
const router = express.Router() // Use built in express router
const { Posts } = require('../models') // instance of the DB model of Post

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
    const userID = req.body.FinderID;
    const result = await Posts.findAll({
        where:{
            FinderID:userID
        }
    });

    res.send(result);
});


module.exports = router // Need to be able to access this router in index.js so we export it
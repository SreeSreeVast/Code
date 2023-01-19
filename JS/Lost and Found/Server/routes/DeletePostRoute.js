const express = require('express')
const router = express.Router() // Use built in express router

var DeletePost = require('../modules/DeletePost');

router.post("/", async (req, res) => {

    // Need ID for what we are deleting
    const ID = req.body.ID;
    console.log("DELETE REQUEST FOR POST:" + ID);

    // Call the delete routine
    let blnResult = DeletePost.DeletePost(ID);
    res.send(blnResult);
});


module.exports = router // Need to be able to access this router in index.js so we export it
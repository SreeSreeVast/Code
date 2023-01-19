const express = require('express')
const router = express.Router() // Use built in express router
const { Posts } = require('../models') // instance of the DB model of Post

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/", async (req, res) => {

    // console.log("REQUEST RECIEVED:" + req.body.searchTerm);
    // console.log("REQUEST RECIEVED:" + req.body.searchCountry);
    // console.log("REQUEST RECIEVED:" + req.body.searchCity);
    // console.log("REQUEST RECIEVED:" + req.body.searchDate);
    // const searchObj={};
    // searchObj.createdAt = req.body.createdAt;
    // searchObj.Country = req.body.Country;
    // searchObj.Region = req.body.Region;
    // searchObj.Title = req.body.Title;

    
    const createdAt = req.body.createdAt;
    const Country = req.body.Country;
    const Region = req.body.Region;
    const Title = req.body.Title;
    const Tags = req.body.Tags;
    const FoundItem = req.body.FoundItem;

    //console.log(searchTerm);
    //let selectsql = "SELECT * FROM dbLostAndFound.item WHERE Title LIKE \"%"+ searchTerm +"%\" ";

    //const result = await sequelize.query("SELECT * FROM Posts WHERE Title LIKE \"%" + this.search + "%\" ", { type: QueryTypes.SELECT });

    result = await Posts.findAll({
        where: {
            [Op.and]: [
                {
                    createdAt: {
                        [Op.like]: '%' + createdAt + '%'
                    }
                },

                {
                    Title: {
                        [Op.like]: '%' + Title + '%'
                    }
                },
                {
                    Tags: {
                        [Op.like]: '%' + Tags + '%'
                    }
                },
                
                {
                    [Op.and]: [
                        {
                            Country:{
                                [Op.like]: '%' + Country + '%'
                            }
                        },
                        {
                            Region:{
                                [Op.like]: '%' + Region + '%'
                            }
                        },
                        
                    ]
                }
            ]
            
        }      
          
    });
    console.log(result);
    res.send(result)  
});


module.exports = router // Need to be able to access this router in index.js so we export it
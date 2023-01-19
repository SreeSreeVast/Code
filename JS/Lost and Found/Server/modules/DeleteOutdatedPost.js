const { Posts } = require('../models') // instance of the DB model of Post
const { Op } = require('sequelize')
const moment= require('moment') 

// Delete the post from the database and delete the image from the userimages folder
var DeletePost = require('../modules/DeletePost');


async function DeleteOutdatedPost()
{

    console.log("=========== DeleteOutdatedPost called ===========");
    const Post = await Posts.findAll({
        where: {
            createdAt:{
                [Op.lt]: moment().subtract(365, 'days').toDate()
                //[Op.lt]: moment().subtract(1, 'minutes').toDate()
                //[Op.lt]: moment().subtract(1, 'days').toDate()
            }
        },
    });

    console.log("POSTS OLDER THAN 1 YEAR (ID)");

    Post.forEach( 
        (item) => { 
            let ID = item.dataValues.IID;
            console.log(ID);
            DeletePost.DeletePost(ID);
        }
      );

      console.log("=========== OLD POSTS DELETED ==========="); 

}

module.exports.DeleteOutdatedPost = DeleteOutdatedPost;
const { Posts } = require('../models') // instance of the DB model of Post

const fs = require('fs') // File system

// Delete the post from the database and delete the image from the userimages folder


async function DeletePost(PostID)
{
    let blnDone = false;
    const path = '../client/public/userimages/'

    const Post = await Posts.findOne({
        where: {
            IID: PostID,
        },
    })

    if (Post == null){
        // If can't find post then bail out
        console.log("DELETE POST ERROR: NO POST FOUND");
        return blnDone;
    }

    console.log("==========DELETE POST==========");
    // Grab required information
    var fileName = Post.ImageName;
    var IsUploadedImage = Post.Upload;

    console.log(fileName);

    // Now that we have what we need from the entry, delete it from the database
    Posts.destroy({
        where: {
            IID: PostID,
        },
    })
    
    if (IsUploadedImage == 1)
    {
        // Indicates a user uploaded image, will need to delete
        try{
            fs.unlinkSync(path + fileName);
        } catch (e)
        {
            console.log("ERROR DELETING IMAGE" + fileName);
            return blnDone
        }
    }
    else
    {
        blnDone = true;
        // Not a user uploaded image (stock image or default img)
        // No need to do anything
    }


    blnDone = true;
    return blnDone;
}

module.exports.DeletePost = DeletePost;
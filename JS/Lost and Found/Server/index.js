const express = require('express');
const app = express();

// Needed for DB tables HNN
const db = require('./models')

// NEED THIS WHENEVER PASSING ANYTHING TO BACKEND HNN
// ALSO NEED CORS to allow requests from the same device to go through HNN
app.use(express.json()); // Parse all JSONS that are sent to backendHNN

const cors = require('cors');
app.use(cors());

// Scheduling fo tasks
const cron = require('node-cron');

// Find and delete posts older than a year module
var DeleteOutdatedPost = require('./modules/DeleteOutdatedPost');



// Routings HNN
const postRouter = require('./routes/Posts');
app.use("/createPosts", postRouter);

const postNoImgRouter = require('./routes/PostsNoImage');
app.use("/createPostsNoImage", postNoImgRouter);

const viewPostRouter = require('./routes/ViewPosts');
app.use("/viewPosts", viewPostRouter);

const searchPostRouter = require('./routes/SearchPosts');
app.use("/searchPosts", searchPostRouter);

const msgRouter = require('./routes/Msg');
app.use('/createMsg', msgRouter);

const inboxRouter = require('./routes/Inbox');
app.use('/Inbox', inboxRouter);

const userRouter = require('./routes/Users');
app.use('/Users', userRouter);

const answerRouter = require('./routes/Answer');
app.use('/createAnswer', answerRouter);

const answersPageRouter = require('./routes/AnswersPage');
app.use('/AnswersPage', answersPageRouter);

const deletePostRouteRouter = require('./routes/DeletePostRoute');
app.use('/DeletePost', deletePostRouteRouter)

const myPostRouteRouter = require('./routes/ViewAll');
app.use('/viewAll', myPostRouteRouter)


cron.schedule('0 0 0 * * *', function() {
	// '0 0 0 * * *'
	// ^ Runs every day, use for live

	// '* * * * *'
	// ^ Runs every minute, use for debug

	// Will run once every day at midnight
    console.log("CRON TASK RAN: DELETE YEAR OLD POSTS");
	DeleteOutdatedPost.DeleteOutdatedPost();
})

// Initialize database at the same time start the API listening
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
		console.log("Backend Node.js running on port 3001");
	});
});


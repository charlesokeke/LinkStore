require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const linkRoutes = require('./routes/links')
const {loginRequired, ensureCorrectUser} = require('./middleware/auth')
const db = require("./models");
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
	"/api/users/:id/links", 
	loginRequired,
	ensureCorrectUser, 
	linkRoutes
	);

app.get('/api/links', async function(req,res,next){
	try{
		let allLinks = await db.Link.find({public:true}).limit(5).sort({createdAt:'desc'}).populate('user',{
			username:true,
			profileImageUrl:true
		})
		console.log(allLinks)
		return res.status(200).json(allLinks)

	}catch(error){
		return next(error)
	}
})
app.use(function(req, res, next) {
  let err = new Error("Not Found at all");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});

require('dotenv').load()
const jwt = require('jsonwebtoken')

//make sure the user is logged in -- authentication
 exports.loginRequired = function(req,res,next){
 	try{
 		const token = req.headers.authorization.split(' ')[1]
 		jwt.verify(token, process.env.SECRET_KEY, function(err, payload){
 			if(payload){
 				return next()
 			}else{
 				return next({
 					status:401,
 					message: 'Please login before attempting that'
 				})
 			}

 		})

 	}catch(error){
 		return next({
 			status:401,
 			message:'Login failed'
 		})

 	}
 }


// make sure we get the correct user -- authorization
exports.ensureCorrectUser = function (req,res,next) {
	try{
		const token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.SECRET_KEY, function(error,payload) {
			if(payload && payload.id === req.params.id){
				return next()
			} else{
				return next({
					status:401,
					message:'Unauthorized'
				})
			}
		})

	}catch(error){
			return next({
					status:401,
					message:'Unauthorized'
				})

	}
}
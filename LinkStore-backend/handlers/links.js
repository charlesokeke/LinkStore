const db = require('../models')


exports.createLink = async function(req,res,next){
	try{
		let link = await db.Link.create({
			url:req.body.url,
			urlDescription:req.body.urld,
			urlSource:req.body.website,
			public:req.body.public,
			user:req.params.id

		})
		let foundUser = await db.User.findById(req.params.id)
		    foundUser.links.push(link.id)
		    await foundUser.save()
		 let foundLink = await db.Link.findById(link.id).populate('user', {
		 	username:true,
		 	profileImageUrl:true
		 }) 
		 res.status(200).json({foundLink})  

	}catch(error){
		return next(error)

	}

}
exports.updateLink = async function (req, res,next){

	try{
		let updatedLink = await db.Link.findOneAndUpdate(
			{_id:req.params.link_id},
			
				{
				"url":req.body.url,
				"urlDescription":req.body.urld,
				"urlSource":req.body.website,
				"public":req.body.public
				},
				{new:true}
			
			)
			return res.status(200).json(updatedLink)
			

	}catch(error){
		return next(error)
	}
}
exports.searchLink = async function (req,res,next){
	console.log(req.body)
	try{
		let foundLink = await db.Link.find({"$or":[{"user":req.body.userid},{"public":true}]}).sort({createdAt:'desc'}).populate('user',{
			"username":true,
			"profileImageUrl":true
		})
		
		foundLink =  await foundLink.filter(element => element.urlSource.includes(req.body.value))
		res.status(200).json(foundLink)

		
	}catch(error){
		return next(error)
	}

}
exports.getLink = async function(req,res,next){
		try{
			let link = await db.Link.find({user:req.params.link_id}).populate('user',{username:true,profileImageUrl:true})
			return res.status(200).json(link)
		}catch(error){
			return next(error)

		}

}
exports.getLinkForUpdate = async function(req,res,next){
	try{
		let link = await db.Link.find({_id:req.params.link_id})
		return res.status(200).json(link)
	}catch(error){
		return next(error)

	}

}
exports.deleteLink = async function (req,res,next){
		try{
			let foundLink = await db.Link.findById(req.params.link_id)
	         foundLink.remove()
	         return res.status(200).json(foundLink)


		}catch(error){
			return next(error)
		}
}
const mongoose = require('mongoose')
const User = require('./user')
const linkSchema = new mongoose.Schema({
	url:{
		type: String,
		require:true,
		maxLength:300
	},
	urlDescription:{
		type: String,
		required: true,
		maxLength:300
	},
	urlSource:{
		type: String,
		required:true

	},
	public:{
		type:Boolean
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
},
  {
	timestamps:true
  }
)
linkSchema.pre('remove', async function(next){
	try{
		let removeId =  await User.findById(this.user)
		removeId.links.remove(this.id)
		await removeId.save
		return next()	

	}catch(error){
		return next(error)
	}
})
const Link = mongoose.model('Link',linkSchema)
module.exports = Link;
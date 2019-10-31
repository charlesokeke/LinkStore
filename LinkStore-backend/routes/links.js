const express = require('express')
const router = express.Router({mergeParams:true})
const {createLink,getLink,deleteLink,getLinkForUpdate,updateLink,searchLink} = require('../handlers/links')

router.route('/').post(createLink)
router.route('/:link_id').get(getLink)
router.route('/update/:link_id').get(getLinkForUpdate)
router.route('/searchlink/:link_id').post(searchLink)
router.route('/updatelink/:link_id').put(updateLink)
router.route('/:link_id').delete(deleteLink)
module.exports = router
const Subscription = require('../models/subscription.model');
const mongoose = require('mongoose');

const subscriptionId = async (req,res,next)=>{
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            return res.status(404).json({
                error: true,
                message: 'Subscription not found'
            });
        }
        next();
    }catch(err){
        console.log(err.message);
        return res.status(404).json({
            error: true,
            message: 'invalid subscription id'
        });
    }
}
const isValidId={
    subscriptionId:subscriptionId
}     
    
module.exports = isValidId;
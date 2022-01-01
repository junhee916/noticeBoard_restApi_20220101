const commendModel = require('../models/commend')
const commendController = {}
commendController.get = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findById(id)
                                    .populate('user', ["email"])
                                    .populate('board', ["board"])
            if(!commend){
                res.status(403).json({
                    msg : "no commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get commend",
                    commendData : {
                        id : commend["_id"],
                        user : commend["user"],
                        board : commend["board"],
                        commend : commend["commend"]
                    }
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.save = async (req, res) => {
    const newCommend = new commendModel({
        user : res.locals.user.id,
        board : req.params.boardId,
        commend : req.body.commend
    })
    try{
        if(req.locals.user){
            const commend = await newCommend.save()
            res.status(200).json({
                msg : "save commend",
                commenData : {
                    id : commend["_id"],
                    user : commend["user"],
                    board : commend["board"],
                    commend : commend["commend"]
                }
            })
        }
        else{
            res.status(403).json({
                msg : "no commendId"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.update = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndUpdate(id, {$set : {
                            commend : req.body.commend
                        }})
            if(!commend){
                return res.status(403).json({
                    msg : "no commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update commend by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.delete = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndRemove(id)
            if(!commend){
                return res.status(403).json({
                    msg : "no commnedId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete commend by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
module.exports = commendController
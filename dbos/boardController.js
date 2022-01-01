const boardModel = require('../models/board')
const boardController = {}
boardController.getAll = async (req, res) => {
    try{
        const boards = await boardModel.find()
                                .populate('user', ["email"])
        res.status(200).json({
            msg : 'get boards',
            count : boards.length,
            boardsData : boards.map(board => {
                return {
                    id : board["_id"],
                    user : board["user"],
                    board : board["board"]
                }
            })
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.messaeg
        })
    }
};
boardController.get = async (req, res) => {
    const id = req.params.boardId
    try{
        if(res.locals.user){
            const board = await boardModel.findById(id)
                                    .populate('user', ["email"])
            if(!board){
                return res.status(403).json({
                    msg : "no boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get board",
                    boardData : {
                        id : board["_id"],
                        user : board["user"],
                        board : board["board"]
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
boardController.save = async (req, res) => {
    const {board} = req.body
    const newBoard = new boardModel({
        user : res.locals.user.id, 
        board
    })
    try{
        if(res.locals.user){
            const board = await newBoard.save()
            res.status(200).json({
                msg : "save board",
                boardData : {
                    id : board["_id"],
                    user : board["user"],
                    board : board["board"]
                }
            })
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
boardController.update = async (req, res) => {
    const id = req.params.boardId
    try{
        if(res.locals.user){
            const board = await boardModel.findByIdAndUpdate(id, {$set : {
                            user : res.locals.user.id,
                            board: req.body.board
                        }})
            if(!board){
                return res.status(403).json({
                    msg : "no boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update board by id: " + id
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
boardController.deleteAll = async (req, res) => {
    try{
        if(res.locals.user){
            await boardModel.remove()
            res.status(200).json({
                msg : "delete boards"
            })
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
boardController.delete = async (req, res) => {
    const id = req.params.boardId
    try{
        if(res.locals.user){
            const board = await boardModel.findByIdAndRemove(id)
            if(!board){
                return res.status(403).json({
                    msg : "no boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete board by id: " + id
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
module.exports = boardController
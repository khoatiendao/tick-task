const Model = require('../models/userModel')

const broadService = {
    async createBoard(board) {
        const result = await Model.boardModel.create(board)
        return result;
    },

    async findBoardById(_id) {
        const result = await Model.boardModel.findById(_id).exec();
        return result;
    },

    async findBoardByIdWithOtherController(board_id) {
        const result = await Model.boardModel.findById(board_id).exec();
        return result
    },

    async findBoardAll() {
        const result = await Model.boardModel.find({}).exec();
        return result;
    },

    async updateBoardById(board) {
        const board_Id = board._id
        const newValues = {
            title: board.title,
            department: board.department
        }
        const result = await Model.boardModel.findByIdAndUpdate(board_Id, newValues, {new: true});
        return result
    },

    async deleteBoardById(_id) {
        const result = await Model.boardModel.findByIdAndDelete(_id);
        return result;
    }

}

module.exports = broadService
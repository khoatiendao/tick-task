const Model = require('../models/userModel')

const boardListService = {
    async create(boardList) {
        const result = await Model.boardListModel.create(boardList);
        return result;
    },

    async getAll() {
        const result = await Model.boardListModel.find({});
        return result
    },

    async getById(_id) {
        const result = await Model.boardListModel.findById(_id).exec();
        return result
    },

    async getByIdWithOtherController(boardList_id) {
        const result = await Model.boardListModel.findById(boardList_id).exec();
        return result;
    },

    async updateById(_id, boardList) {
        const newValues = {
            title: boardList.title,
            board: boardList.board
        }
        const result = await Model.boardListModel.findByIdAndUpdate(_id, newValues, {new: true})
        return result
    },

    async deleteById(_id) {
        const result = await Model.boardListModel.findByIdAndDelete(_id).exec();
        return result
    }
}

module.exports = boardListService;
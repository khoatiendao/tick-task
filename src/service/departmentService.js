const Model = require('../models/userModel')

const departmentService = {
    async createDepartment(department) {
        const result = await Model.departmentModel.create(department);
        return result;
    },

    async getAllDepartment() {
        const result = await Model.departmentModel.find({}).exec();
        return result;
    }, 
    
    async getDepartmentById(_id) {
        const result = await Model.departmentModel.findById(_id).exec()
        return result;
    },

    async getDepartmentByIdWithOrtherController(department_id) {
        const result = await Model.departmentModel.findById(department_id).exec();
        return result;
    },

    async deleteDepartmentById(_id) {
        const result = await Model.departmentModel.findByIdAndDelete(_id);
        return result;
    }

}

module.exports = departmentService;
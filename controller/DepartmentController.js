const DepartmentModel = require('../model/DepartmentModel');
exports.addDepartment = async (req, res) => {
    //  console.log(req.body)
    try {

        let department = new DepartmentModel({
            name: req.body.name,
            hod: req.body.hod,
            email: req.body.email,
            phone: req.body.phone,
            status: req.body.status
        })
        // console.log(department)
        await department.save();
        res.status(200).json({
            success: true,
            message: "Department added successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(401).json({
            message: "failed to add department"
        })
    }
}
exports.getDepartment = async (req, res) => {
    try {
        let department = await DepartmentModel.find();
        res.send(department);
    }
    catch {
        res.status(401).json({
            message: "no department found"
        })
    }
}


exports.editDepartment = async (req, res) => {
    console.log(req.params.id)
    try {
        let department = await DepartmentModel.findById(req.params.id);
        //console.log(department)
        res.send(department);
    }
    catch {
        res.status(401).json({
            message: "no department found"
        })
    }
}
exports.updateDepartment = async (req, res) => {
    console.log(req.body)
    try {
        let { _id, name, hod, email, phone,status } = req.body;
        await DepartmentModel.findByIdAndUpdate(_id, {
            name, hod, email, phone,status
        });
        res.status(200).json({
            message: "Updated successfully"
        })

    }
    catch {
        res.status(401).json({
            message: "Failed to update"
        })
    }
}
exports.deleteDepartment = async (req, res) => {
    try {
        await DepartmentModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Deleted successfully"
        })
    }
    catch {
        res.status(401).json({
            message: "failed to delete"
        })
    }
}
exports.searchDepartment = async (req, res) => {
    // console.log(req.body);
    const name = req.body.departmentname;
    try {
        const department = await DepartmentModel.find({ name: { $regex: new RegExp(name, 'i') } })

        if (!department.length > 0) {
            console.log("not found")
            res.status(401).json({
                message: "Student not found"
            })
            return false;
        }
        // console.log(department)
        res.send(department)
    }
    catch {
        res.status(401).json({
            message: "Student not found"
        })
    }
}
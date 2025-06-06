const studentModel = require('../model/StudentModel');
const courseModel = require('../model/CourseModel');
const AccountModel = require('../model/AccountModel');
const historyModel = require('../model/HistoryModel');
const fs = require('fs');
const path = require('path');
exports.addStudent = async (req, res) => {
    try {
        // let Course = await courseModel.findById(req.body.course);
        // if (!Course) {
        //     return res.status(400).json({
        //         message: "Course not found"
        //     });
        // }
        let paddress = req.body.paddress;
        let taddress = req.body.taddress;
        let studentData = new studentModel({
            name: req.body.name,
            grade: req.body.grade,
            phone: req.body.phone,
            email: req.body.email,
            advancefee: req.body.advancefee,
            dob: req.body.dob,
            gender: req.body.gender,
            address: [{ taddress, paddress }],
            image: req.file.path,
            course: req.body.course,
            description: req.body.description
        });
        studentData = await studentData.save();
        if (studentData) {
            return res.status(200).json({
                message: "New student added successfully"
            });
        }
    } catch (Err) {
        res.status(400).json({
            message: "Failed to add student"
        });
        console.log(Err);
    }
};
exports.getStudent = async (req, res) => {
    try {
        let student = await studentModel.find();
        res.send(student)
    }
    catch {
        res.status(400).json({
            message: "Student not found"
        })
    }
}
exports.editStudent = async (req, res) => {
    try {
        let student = await studentModel.findById(req.params.id);
        if (student) {
            console.log(student.course);
            res.send(student);
        }
    }
    catch {
        res.status(400).json({
            message: "Student not found"
        })
    }
}
exports.updateStudent = async (req, res) => {
    // console.log(req.body)
    try {
        const id = req.body.id;
        let student = await studentModel.findById(id);
        if (!student) {
            res.status(400).json({
                message: "student not found"
            })
        }
        const { name, grade, email, course, phone, description, dob, advancefee, gender } = req.body;
        let paddress = req.body.paddress;
        let taddress = req.body.taddress;
        let address = [{ taddress, paddress }];
        let image = student.image;
        //  console.log(req.body)
        if (req.file && req.file.path) {
            const oldimgpath = path.join(__dirname, '../', student.image)
            console.log(oldimgpath)
            fs.unlink(oldimgpath, (err) => {
                if (err) {
                    console.log("failed to delete old image")
                }
                else {
                    console.log("deleted")
                }
            })
            image = req.file.path
        }
        let update = await studentModel.findByIdAndUpdate(id, { name, email, phone, description, dob, course, gender, grade, advancefee, image, address })
        if (update) {
            console.log("update")
            res.status(200).json({
                message: "Course updated successfully"
            })
        }
    }
    catch {
        res.status(400).json({
            message: "Failed to update course "
        })
    }
}
// exports.deleteStudent = async (req, res) => {
//     try {
//         let student = await studentModel.findById(req.params.id);
//         if (!student) {
//             return res.status(400).json({
//                 message: "student not found",
//                 success: false
//             })
//         }


//         const oldimgpath = path.join(__dirname, '../', student.image)
//         //console.log(oldimgpath)
//         fs.unlink(oldimgpath, (err) => {
//             if (err) {
//                 console.log("failed to delete old image")
//             }
//             else {
//                 console.log("deleted")
//             }
//         })
//         let account=await AccountModel.find({studentId:req.params.id})
//         if(!account){
//             console.log("account not found");
//         }
//         let history=await historyModel.find({accountId:account[0]._id})
//         if(!history){
//             console.log("failed to delete history");          
//         }
//         await history.deleteMany();
//         await account.delete();
//         await studentModel.findByIdAndDelete(req.params.id, { student });

//         res.status(200).json({
//             message: "student records deleted successfully"
//         })
//     }
//     catch {
//         res.status(400).json({
//             message: "Failed to delete student records"
//         })
//     }
// }
exports.deleteStudent = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                success: false
            });
        }

        // Delete student image
        const oldImgPath = path.join(__dirname, '../', student.image);
        fs.unlink(oldImgPath, (err) => {
            if (err) {
                console.error("Failed to delete old image:", err);
            } else {
                console.log("Deleted old image successfully");
            }
        });

        // Find and delete associated account
        const accounts = await AccountModel.find({ studentId: req.params.id });
        if (accounts.length === 0) {
            console.log("Account not found");
        } else {
            // Delete associated history records
            const historyRecords = await historyModel.find({ accountId: accounts[0]._id });
            if (historyRecords.length === 0) {
                console.log("No history records found");
            } else {
                await historyModel.deleteMany({ accountId: accounts[0]._id });
                console.log("Deleted associated history records");
            }

            // Delete the account
            await AccountModel.deleteMany({ studentId: req.params.id });
            console.log("Deleted associated account");
        }

        // Delete student
        await studentModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Student records deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting student records:", error);
        res.status(400).json({
            message: "Failed to delete student records",
            error: error.message
        });
    }
};
exports.getStudentInfo = async (req, res) => {
    //  console.log(req.params.id)
    try {
        let Student = await studentModel.findById(req.params.id)
        //console.log(Student);
        res.send(Student)
    }
    catch {
        res.status(400).json({
            message: "Student not found"
        })
    }
}
exports.searchStudent = async (req, res) => {
   // console.log(req.body);
    const name = req.body.search;
    try {
        const student = await studentModel.find({ name: { $regex: new RegExp(name, 'i') } })
        // if (!student) {
        //     console.log("not found")
        //     res.status(401).json({
        //         message: "Student not found"
        //     })
        //     return false;
        // }
        if(!student.length>0){
          //  console.log("not found")
            res.status(401).json({
                message: "Student not found"
            })
           return false;
        }
      //  console.log(student)
        res.send(student)
    }
    catch {
        res.status(401).json({
            message: "Student not found"
        })
    }
}
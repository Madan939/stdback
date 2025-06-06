const CourseModel = require('../model/CourseModel');
const fs = require('fs');
const path = require('path');
exports.addCourse = async (req, res) => {
    //console.log(req.body)
    try {
        const newCourse = new CourseModel({
            name: req.body.name,
            duration: req.body.duration,
            price: req.body.price,
            image: req.file.path,
            department: req.body.department,
            description: req.body.description
        })
        // console.log(newCourse)
        await newCourse.save()
        res.status(200).json({
            message: 'course added successfully'
        })
    }
    catch (err) {
        res.status(400).json({
            error: "Failed to add course"
        })
    }
}
exports.getCourse = async (req, res) => {
    try {
        let course = await CourseModel.find();
        res.send(course)
    }
    catch {
        res.status(400).json({
            message: "Course not found"
        })
    }
}
exports.editCourse = async (req, res) => {
    //console.log(req.params.id)
    try {
        let course = await CourseModel.findById(req.params.id);
        res.send(course);
    }
    catch {
        res.status(401).json({
            message: "no department found"
        })
    }
}
exports.updateCourse = async (req, res) => {
    //console.log(req.body)
    try {
        const id = req.body.id;
        let course = await CourseModel.findById(id);
        if (!course) {
            res.status(400).json({
                message: "course not found"
            })
        }
        //console.log(course)
        const { name, price, description, duration, department } = req.body;
        let image = course.image;
        //  console.log(req.body)
        if (req.file && req.file.path) {
            const oldimgpath = path.join(__dirname, '../', course.image)
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
        let update = await CourseModel.findByIdAndUpdate(id, { name, duration, price, image, department, description })
        if (update) {
            //  console.log("updated")
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
exports.deleteCourse = async (req, res) => {
    try {
        let Course = await CourseModel.findById(req.params.id);
        if (!Course) {
            return res.status(400).json({
                message: "Course not found",
                success: false
            })
        }
        const oldimgpath = path.join(__dirname, '../', Course.image)
        //console.log(oldimgpath)
        fs.unlink(oldimgpath, (err) => {
            if (err) {
                console.log("failed to delete old image")
            }
            else {
                console.log("deleted")
            }
        })
        await CourseModel.findByIdAndDelete(req.params.id, { Course });
        res.status(200).json({
            message: "Course deleted successfully"
        })
    }
    catch {
        res.status(400).json({
            message: "Failed to delete course"
        })
    }
}
exports.getOneCourse=async(req,res)=>{
    //  console.log(req.params.id)
      try{
          let course=await CourseModel.findById(req.params.id)
          //console.log(course);
          res.send(course)
      }
      catch{
          res.status(400).json({
              message:"Course not found"
          })
      }
  }
  exports.searchCourse=async(req,res)=>{
   // console.log(req.body)
    const name = req.body.search;
    try {
        const course = await CourseModel.find({ name: { $regex: new RegExp(name, 'i') } })
    
        if(!course.length>0){
           console.log("not found")
            res.status(401).json({
                message: "Student not found"
            })
           return false;
        }
      // console.log(course)
        res.send(course)
    }
    catch {
        res.status(401).json({
            message: "Student not found"
        })
    }
  }
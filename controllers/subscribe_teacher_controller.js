const TeacherModel = require('../models/teacher.model');
const StudentModel = require('../models/student.model');
const subscribedTeacherModel = require('../models/subscribedTeacher.model');


exports.findTeacher = async (req, res) => {
    try{
        const data ={
            distance:req.body.distance,
            studentId:req.body.id
       }
       const teachers = await TeacherModel.find({distance:{$lte:req.body.distance}});
       if(!teachers ||teachers.length===0){
            return res.status(404).json({
                message: "Teacher Not Found"
            });
        }
        return res.status(200).json({
            message: "Teacher Found",
            data: teachers
        });
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            error: err,
            message: "Server Error"
        });
    }
};

exports.selectTeacher = async(req,res)=>{
    try{
        const data ={
            teacherId:req.params.id,
            studentId:req.body.studentId
        }
        const teacher = await TeacherModel.findById(data.teacherId);
        if(!teacher){
            return res.status(404).json({
                message: "Teacher Not Found"
            });
        }
        console.log(data.studentId);
        
        const student = await StudentModel.findById(data.studentId);
        console.log(student);
        
        if(!student){
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        
        teacher.studentSubscriptions.push(data.studentId);
        await teacher.save();

        student.subscribedTeachers.push(data.teacherId);
        await student.save();
        
        const teacherSubscriptions = await subscribedTeacherModel.create(data);
        if(!teacherSubscriptions){
            return res.status(404).json({
                message: "Teacher Not Subscribed"
            });
        }
            
        
        res.status(200).json({
            message: "Teacher subscribed successfully"
,
        });
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            error: err,
            message: "Server Error"
        });
    }
}

exports.getSubscribedTeachersStudentList = async (req, res) => {
    
        try{
            const data ={
                teacherId:req.params.id
            }
            const teacher = await TeacherModel.findById(data.teacherId);
            if(!teacher){
                return res.status(404).json({
                    message: "Teacher Not Found"
                });
            }
            
            
            const students = await StudentModel.find({_id:{$in:teacher.studentSubscriptions}});
            


            res.status(200).json({
                message: "Student subscribed successfully",
                data:students
            });
        }
        catch(err){
            console.log(err.message);
            res.status(500).json({
                error: err,
                message: "Server Error"
            });
    }
}
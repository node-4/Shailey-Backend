const StudentModel = require("../models/student.model");
const loginModel = require("../models/otp.model");
exports.createStudent = async (req, res) => {
    try {
        const studentExists = await loginModel.findOne({
            phone: req.user.phone,
        });
        // console.log(req.user._id);
        const data = {
            userId: studentExists._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            dob: req.body.dob,
            latestQualification: req.body.latestQualification,
            Qualification: req.body.Qualification,
            gender: req.body.gender,
            guardian: req.body.guardian,
            religion: req.body.religion,
            nationality: req.body.nationality,
            address: req.body.address,
            category: req.body.category,
            subject: req.body.subject,
            class: req.body.class,
            subjectStream: req.body.subjectStream,
            location: req.body.location,
            distance: req.body.distance,
            panCard: req.body.panCard,
            aadharCard: req.body.aadharCard,
            governmentDocumentType: req.body.governmentDocumentType,
            governmentDocument: req.body.governmentDocument,
            voterId: req.body.voterId,
            email: req.body.email,
        };

        const student = await StudentModel.create(data);
        studentExists.role = "student";
        await studentExists.save();
        res.status(201).json({
            data: student,
            message: "student created successfully",
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message:
                "internal server error while creating student registration",
        });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        res.status(200).json({
            data: student,
            message: "student found",
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "internal server error while getting student ",
        });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        student.firstName = req.body.firstName
            ? req.body.firstName
            : student.firstName;
        student.lastName = req.body.lastName
            ? req.body.lastName
            : student.lastName;
        student.phoneNumber = req.body.phoneNumber
            ? req.body.phoneNumber
            : student.phoneNumber;
        student.Qualification = req.body.Qualification
            ? req.body.Qualification
            : student.Qualification;
        student.category = req.body.category
            ? req.body.category
            : student.category;
        student.subject = req.body.subject ? req.body.subject : student.subject;
        student.subjectStream = req.body.subjectStream
            ? req.body.subjectStream
            : student.subjectStream;
        student.class = req.body.class ? req.body.class : student.class;
        student.latestQualification = req.body.latestQualification
            ? req.body.latestQualification
            : student.latestQualification;
        student.guardian = req.body.guardian
            ? req.body.guardian
            : student.guardian;
        student.religion = req.body.religion
            ? req.body.religion
            : student.religion;
        student.nationality = req.body.nationality
            ? req.body.nationality
            : student.nationality;
        student.address = req.body.address ? req.body.address : student.address;
        student.location = req.body.location
            ? req.body.location
            : student.location;
        student.distance = req.body.distance
            ? req.body.distance
            : student.distance;
        student.email = req.body.email ? req.body.email : student.email;
        student.governmentDocument = req.body.governmentDocument
            ? req.body.governmentDocument
            : student.governmentDocument;
        student.governmentDocumentType = req.body.governmentDocumentType
            ? req.body.governmentDocumentType
            : student.governmentDocumentType;
        student.gender = req.body.gender ? req.body.gender : student.gender;
        const updatedStudent = await student.save();
        console.log(updatedStudent);
        if (!updatedStudent) {
            return res.status(404).json({
                message: "student is not updated",
            });
        }
        res.status(200).json({
            data: updatedStudent,
            message: "student updated successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error while updating student ",
        });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        const deletedStudent = await student.delete();
        if (!deletedStudent) {
            return res.status(404).json({
                message: "student not deleted",
            });
        }
        res.status(200).json({
            message: "student deleted successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error while deleting student ",
        });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const student = await StudentModel.find({});
        console.log(student.length);

        if (!student || student.length === 0) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        res.status(200).json({
            message: "student found",
            data: student,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error while getting all student",
        });
    }
};

exports.getAllStudentsByClass = async (req, res) => {
    try {
        const classId = req.body;
        const student = await StudentModel.find({ class: { $all: [classId] } });

        if (!student) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        res.status(200).json({
            message: "student found",
            data: student,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:
                "internal server error while getting all student in ${classId}",
        });
    }
};

exports.getStudentByUserId = async (req, res) => {
    try {
        const userID = req.params.userId;
        console.log(userID.toString());
        const student = await StudentModel.findOne({
            userId: userID.toString(),
        });
        if (!student) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        res.status(200).json({
            data: student,
            message: "student found",
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "internal server error while getting student ",
        });
    }
};

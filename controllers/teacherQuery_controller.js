const TeacherQueryModel = require("../models/teacherQuery.model");
const Teacher = require("../models/teacher.model");

exports.createTeacherQuery = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ userId: req.user._id });
        //
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        const data = {
            name: teacher.firstName + " " + teacher.lastName,
            teacherId: teacher._id,
            message: req.body.message,
        };

        const teacherQuery = await TeacherQueryModel.create(data);
        res.status(201).json({
            message: "query Submitted",
            data: teacherQuery,
        });
    } catch (err) {
        res.status(500).json({
            message: "query submission failed!",
        });
    }
};

exports.getAllTeacherQuery = async (req, res) => {
    try {
        const teacherQuery = await TeacherQueryModel.find().populate(
            "teacherId"
        );
        if (!teacherQuery || teacherQuery.length === 0) {
            return res.status(404).json({
                message: "Teacher's Query not found",
            });
        }
        res.status(200).json({
            message: "query'found",
            data: teacherQuery,
        });
    } catch (err) {
        res.status(500).json({
            message: " getting all teachers's query  failed!",
        });
    }
};

exports.deleteTeacherQuery = async (req, res) => {
    try {
        const teacherQuery = await TeacherQueryModel.findById(req.params.id);
        if (!teacherQuery) {
            return res.status(404).json({
                message: "Teacher's Query not found",
            });
        }
        teacherQuery.remove();
        res.status(200).json({
            message: "query'deleted",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "query delete failed!",
        });
    }
};

exports.updateTeacherQuery = async (req, res) => {
    try {
        const teacherQuery = await TeacherQueryModel.findById(req.params.id);
        if (!teacherQuery) {
            return res.status(404).json({
                message: "Teacher's Query not found",
            });
        }
        teacherQuery.message = req.body.message
            ? req.body.message
            : teacherQuery.message;
        const updatedQuery = await teacherQuery.save();
        res.status(200).json({
            message: "query updated",
            data: updatedQuery,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "query update failed!",
        });
    }
};

exports.getTeacherQueryById = async (req, res) => {
    try {
        const teacherQuery = await TeacherQueryModel.findById(
            req.params.id
        ).populate("teacherId");
        if (!teacherQuery) {
            return res.status(404).json({
                message: "Teacher's Query not found",
            });
        }
        res.status(200).json({
            message: "query found",
            data: teacherQuery,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "query get failed!",
        });
    }
};

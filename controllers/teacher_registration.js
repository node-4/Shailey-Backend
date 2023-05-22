const TeacherModel = require("../models/teacher.model");
const StudentModel = require("../models/student.model");
const loginModel = require("../models/otp.model");
const geolib = require("geolib");
exports.createTeacher = async (req, res) => {
    try {
        // const d = new Date();
        const studentExists = await loginModel.findOne({
            phone: req.user.phone,
        });

        const data = {
            userId: req.user._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            gender: req.body.gender,
            dob: req.body.dob,
            profile: req.body.profile,
            teachingMode: req.body.teachingMode,
            experience: req.body.experience,
            Qualification: req.body.Qualification,
            latestQualification: req.body.latestQualification,
            latestQualificationDocument: req.body.latestQualificationDocument,
            category: req.body.category,
            subject: req.body.subject,
            class: req.body.class,
            subjectStream: req.body.subjectStream,
            price: req.body.price,
            distance: req.body.distance,
            location: req.body.location,
            religion: req.body.religion,
            nationality: req.body.nationality,
            address: req.body.address,
            governmentDocumentType: req.body.governmentDocumentType,
            governmentDocument: req.body.governmentDocument,

            //subscription: req.body.subscription,
            //subscriptionEndDate: d.setMonth(d.getMonth() + 1),
        };

        const teacher = await TeacherModel.create(data);
        studentExists.role = "teacher";
        await studentExists.save();
        // console.log(x);
        res.status(201).json({
            // data:teacher,
            message: "Teacher created successfully",
            data: teacher,
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message:
                "internal server error while creating teacher registration",
        });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await TeacherModel.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        res.status(200).json({
            data: teacher,
            message: "Teacher found",
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "internal server error while getting teacher ",
        });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await TeacherModel.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        teacher.firstName = req.body.firstName
            ? req.body.firstName
            : teacher.firstName;
        teacher.lastName = req.body.lastName
            ? req.body.lastName
            : teacher.lastName;
        teacher.phoneNumber = req.body.phoneNumber
            ? req.body.phoneNumber
            : teacher.phoneNumber;
        teacher.highestQualification = req.body.highestQualification
            ? req.body.highestQualification
            : teacher.highestQualification;
        teacher.latestQualificationDocument = req.body
            .latestQualificationDocument
            ? req.body.latestQualificationDocument
            : teacher.latestQualificationDocument;
        teacher.category = req.body.category
            ? req.body.category
            : teacher.category;
        teacher.subject = req.body.subject ? req.body.subject : teacher.subject;
        teacher.subjectStream = req.body.subjectStream
            ? req.body.subjectStream
            : teacher.subjectStream;
        teacher.class = req.body.class ? req.body.class : teacher.class;
        teacher.price = req.body.price ? req.body.price : teacher.price;
        teacher.distance = req.body.distance
            ? req.body.distance
            : teacher.distance;
        teacher.location = req.body.location
            ? req.body.location
            : teacher.location;
        teacher.rating = req.body.rating ? req.body.rating : teacher.rating;
        teacher.email = req.body.email ? req.body.email : teacher.email;
        teacher.governmentDocument = req.body.governmentDocument
            ? req.body.governmentDocument
            : teacher.governmentDocument;
        teacher.address = req.body.address ? req.body.address : teacher.address;
        teacher.profile = req.body.profile ? req.body.profile : teacher.profile;
        teacher.teachingMode = req.body.teachingMode
            ? req.body.teachingMode
            : teacher.teachingMode;
        teacher.experience = req.body.experience
            ? req.body.experience
            : teacher.experience;
        teacher.governmentDocumentType = req.body.governmentDocumentType
            ? req.body.governmentDocumentType
            : teacher.governmentDocumentType;
        teacher.Qualification = req.body.Qualification
            ? req.body.Qualification
            : teacher.Qualification;
        teacher.latestQualification = req.body.latestQualification
            ? req.body.latestQualification
            : teacher.latestQualification;
        teacher.gender = req.body.gender ? req.body.gender : teacher.gender;
        const updatedTeacher = await teacher.save();
        // console.log(updatedTeacher);
        if (!updatedTeacher) {
            return res.status(404).json({
                message: "Teacher is not updated",
            });
        }
        res.status(200).json({
            data: updatedTeacher,
            message: "Teacher updated successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error while updating teacher ",
        });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await TeacherModel.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        const deletedTeacher = await teacher.delete();
        if (!deletedTeacher) {
            return res.status(404).json({
                message: "Teacher not deleted",
            });
        }
        res.status(200).json({
            message: "Teacher deleted successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error while deleting teacher ",
        });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const queryObj = {};
        if (req.body.category) {
            queryObj.category = req.query.category;
        }
        if (req.body.class) {
            queryObj.class = req.query.class;
        }
        if (req.body.subjectStream) {
            queryObj.subjectStream = req.query.subjectStream;
        }
        if (req.body.subject) {
            queryObj.subject = req.query.subject;
        }
        const teacher = await TeacherModel.find(queryObj).populate(
            "subscription"
        );
        if (!teacher || teacher.length === 0) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        res.status(200).json({
            message: "Teacher found",
            data: teacher,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error while getting all teacher",
        });
    }
};

exports.getAllTeachersByClass = async (req, res) => {
    try {
        const classId = req.body;
        const teacher = await TeacherModel.find({ class: { $all: [classId] } });

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        res.status(200).json({
            message: "Teacher found",
            data: teacher,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:
                "internal server error while getting all teacher in ${classId}",
        });
    }
};

exports.getTeacherByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const teacher = await TeacherModel.findOne({
            userId: userId.toString(),
        });
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        res.status(200).json({
            data: teacher,
            message: "Teacher found",
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "internal server error while getting teacher ",
        });
    }
};

exports.getTeacherSub = async (req, res) => {
    try {
        const teacher = await TeacherModel.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        let date = new Date();
        if (date >= teacher.subscriptionEndDate) {
            console.log(
                `##  subscription ended on ${teacher.subscriptionEndDate} ##`
            );
            return res.status(404).json({ msg: "subscription end ! renew" });
        }
        console.log(
            `Teacher has subscriptions till ${teacher.subscriptionEndDate} ##`
        );
        res.status(200).json({
            data: teacher,
            message: `Teacher has subscriptions till ${teacher.subscriptionEndDate} ##`,
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "internal server error while getting teacher ",
        });
    }
};

exports.getAllTeachersWithInRange = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student)
            return res.status(404).send({ message: "student not found" });

        const range = req.query.distance;

        const studentLocation = {
            longitude: parseInt(student.location.longitude),
            latitude: parseInt(student.location.latitude),
        };

        const docs = await TeacherModel.find();

        if (!docs || docs.length === 0) {
            return res.status(404).send({ msg: "teachers not found" });
        }
        const teachers = docs.filter((doc) => {
            const docLocation = {
                longitude: parseInt(doc.location.longitude),
                latitude: parseInt(doc.location.latitude),
            };
            const distance = geolib.getDistance(studentLocation, docLocation);
            return distance <= range * 1000; // 10 km
        });
        console.log(`teachers found ${teachers.length}`);
        console.log(teachers);
        if (!teachers || teachers.length === 0) {
            return res
                .status(404)
                .send({ message: ` not found any teacher within ${range}km` });
        }
        return res.status(201).json({
            msg: `${teachers.length} teachers found `,
            data: teachers,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.getAllStudentsWithInRange = async (req, res) => {
    try {
        const teacher = await TeacherModel.findById(req.params.id);
        if (!teacher)
            return res.status(404).send({ message: "student not found" });

        const range = req.query.distance;

        const teacherLocation = {
            longitude: parseInt(teacher.location.longitude),
            latitude: parseInt(teacher.location.latitude),
        };

        const docs = await StudentModel.find();

        if (!docs || docs.length === 0) {
            return res.status(404).send({ msg: "students not found" });
        }
        const students = docs.filter((doc) => {
            const docLocation = {
                longitude: parseInt(doc.location.longitude),
                latitude: parseInt(doc.location.latitude),
            };
            const distance = geolib.getDistance(teacherLocation, docLocation);
            return distance <= range * 1000; // 10 km
        });
        console.log(`${students.length} students found `);
        console.log(students);
        console.log(students.length);
        if (!students || students.length === 0) {
            return res
                .status(404)
                .send({ message: ` not found any students within ${range}km` });
        }
        return res.status(201).json({
            msg: `${students.length} students found `,
            data: students,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.getTotal = async (req, res) => {
    try {
        const total = await TeacherModel.find({ subscribed: true });
        if (!total) {
            console.log(`#### not found ####`);
            return res.status(404).send({
                msg: "Not found",
            });
        }
        console.log(`#### total subscribers : ${total.length}`);
        res.status(200).send({ data: total.length });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "internal server error",
            err: err,
        });
    }
};

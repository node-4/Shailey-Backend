const Qualification = require("../models/qualification.model");
const { createResponse } = require("../utils/response");
exports.createQualification = async (req, res) => {
    try {
        if (!req.body.qualification) {
            return createResponse(res, 400, "Qualification Type is required");
        }
        const qualification = new Qualification(req.body);
        await qualification.save();
        createResponse(
            res,
            201,
            "Qualification created successfully",
            qualification
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getQualifications = async (req, res) => {
    try {
        const qualifications = await Qualification.find().lean();
        if (qualifications.length === 0) {
            return createResponse(res, 404, "No Qualifications found");
        }
        createResponse(
            res,
            200,
            "Qualifications fetched successfully",
            qualifications
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findById(
            req.params.id
        ).lean();
        if (!qualification) {
            createResponse(res, 404, "Qualification not found");
            return;
        }
        createResponse(
            res,
            200,
            "Qualification fetched successfully",
            qualification
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.updateQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!qualification) {
            createResponse(res, 404, "Qualification not found");
            return;
        }
        createResponse(
            res,
            200,
            "Qualification updated successfully",
            qualification
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.deleteQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndRemove(
            req.params.id
        );
        if (!qualification) {
            createResponse(res, 404, "Qualification not found");
            return;
        }
        createResponse(res, 200, "Qualification deleted successfully");
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

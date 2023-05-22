const GovtId = require("../models/govt-id.model");
const { createResponse } = require("../utils/response");
exports.createGovtId = async (req, res) => {
    try {
        if (!req.body.govtId) {
            return createResponse(res, 400, "Govt ID is required");
        }
        const govtId = new GovtId(req.body);
        await govtId.save();
        createResponse(res, 201, "Govt ID created successfully", govtId);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getGovtIds = async (req, res) => {
    try {
        const govtIds = await GovtId.find();
        if (!govtIds || govtIds.length === 0) {
            return createResponse(res, 404, "Govt IDs not found");
        }
        createResponse(res, 200, "Govt IDs fetched successfully", govtIds);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.getGovtId = async (req, res) => {
    try {
        const govtId = await GovtId.findById(req.params.id);
        if (!govtId) {
            return createResponse(res, 404, "Govt ID not found");
        }
        createResponse(res, 200, "Govt ID fetched successfully", govtId);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.updateGovtId = async (req, res) => {
    try {
        const govtId = await GovtId.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!govtId) {
            return createResponse(res, 404, "Govt ID not found");
        }
        createResponse(res, 200, "Govt ID updated successfully", govtId);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

exports.deleteGovtId = async (req, res) => {
    try {
        const govtId = await GovtId.findByIdAndDelete(req.params.id);
        if (!govtId) {
            return createResponse(res, 404, "Govt ID not found");
        }
        createResponse(res, 200, "Govt ID deleted successfully", govtId);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, error.message);
    }
};

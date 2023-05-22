const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "login",
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            default: "student",
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            minLength: 10,
        },
        gender: {
            type: String,
            default: "not prefer to disclose",
        },
        dob: {
            type: String,
        },
        Qualification: {
            type: String,
        },
        // educationDocument: {
        //   type: String
        // },
        governmentDocumentType: {
            type: String,
            default: "",
        },
        governmentDocument: {
            type: String,
            default: "",
        },
        panCard: {
            type: String,
            default: "",
        },
        aadharCard: {
            type: String,
            default: "",
        },
        voterId: {
            type: String,
            default: "",
        },

        latestQualification: {
            type: String,
        },
        guardian: {
            type: String,
        },
        religion: {
            type: String,
        },
        nationality: {
            type: String,
        },
        address: {
            type: String,
        },
        class: {
            type: [String],
            required: true,
            trim: true,
            default: 0,
        },
        category: {
            type: [String],
            //required:true,
            //enum:["Educational","non-Educational"]
        },
        subjectStream: {
            type: [String],
            //required:true,
            //  enum:["Commerce","Art","Science","Music","Dance","Cooking/Baking","Sports/Gymnasiam","Arts/Crafts"]
        },
        subject: {
            type: [String],
            //required:true,
        },
        notifications: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "StudentNotification",
        },
        distance: {
            type: Number,
            default: 0,
        },

        location: {
            longitude: {
                type: String,
            },
            latitude: {
                type: String,
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("student", StudentSchema);

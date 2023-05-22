const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema(
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
        profile: {
            type: String,
            default:
                "https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg",
        },
        teachingMode: {
            type: String,
            default: "online",
        },
        experience: {
            type: String,
            default: "0",
        },

        latestQualificationDocument: {
            type: String,
            default: "",
        },
        governmentDocumentType: {
            type: String,
            default: "",
        },
        governmentDocument: {
            type: String,
            default: "",
        },

        phoneNumber: {
            type: Number,
            required: true,
        },
        userType: {
            type: String,
            default: "teacher",
        },
        Qualification: {
            type: String,
            required: true,
        },
        latestQualification: {
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
        rating: {
            type: Number,
            default: 0,
        },
        class: {
            type: [String],
            //required:true,
            trim: true,
            default: 0,
        },
        category: {
            type: [String],
            //required:true,
            // enum:["Educational","non-educational"]
        },
        subjectStream: {
            type: [String],
        },
        subject: {
            type: [String],
        },
        subscription: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Subscription",
        },
        subscriptionEndDate: {
            type: Date,
        },
        distance: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
        },
        review: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "StudentRating",
        },
        notifications: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Notification",
        },
        studentNotifications: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "StudentNotifications",
        },
        location: {
            longitude: {
                type: String,
            },
            latitude: {
                type: String,
            },
        },
        subscribed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);

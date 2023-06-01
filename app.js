const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const morgan = require("morgan");
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});

const userRouter = require("./routes/user.route");
const term = require("./routes/terms.route");
const teacher = require("./routes/teacher.route");
const student = require("./routes/student.route");

app.use("/api/v1", userRouter);
app.use("/", term);
app.use("/", teacher);
app.use("/", student);
app.use("/", require("./routes/admin.route"));
app.use("/", require("./routes/subscription.route"));
app.use("/", require("./routes/order.route"));
app.use("/", require("./routes/legalInfo.route"));
app.use("/", require("./routes/review.route"));
app.use("/", require("./routes/studentRating.route"));
app.use("/", require("./routes/teacherQuery.route"));
app.use("/", require("./routes/studentQuery.route"));
app.use("/", require("./routes/changeTopic.route"));
app.use("/", require("./routes/aboutUs.route"));
//require('./routes/subscribeTeacher.route'));
app.use("/", require("./routes/notification.route"));
app.use("/", require("./routes/notificationAdmin.route"));
app.use("/", require("./routes/studentNotification"));
app.use("/", require("./routes/payment.route"));
app.use("/", require("./routes/subject.route"));
app.use("/", require("./routes/subjectStream.route"));
app.use("/", require("./routes/category.route"));
app.use("/", require("./routes/privacy.route"));
app.use("/", require("./routes/govt-id.route"));
app.use("/api/v1", require("./routes/qualification.route"));
// console.log(require("./routes/govt-id.route"));
app.use("/api/v1", require("./routes/order.route"));

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

// Connect MongoDB at default port 27017.
mongoose.connect(
    "mongodb+srv://shailey:harish12@shialey.jepphhu.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        //useCreateIndex: true,
    },
    (err) => {
        if (!err) {
            console.log("## MongoDB Connection Succeeded.");
        } else {
            console.log("Error in DB connection: " + err);
        }
    }
);

app.listen(process.env.PORT, () => {
    console.log(`## Server listening on port ${process.env.PORT || 6001}.`);
});

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const morgan = require("morgan");
const userRouter = require("./routes/user.route");

const app = express();
app.use(cors());

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1", userRouter);
require("./routes/teacher.route")(app);
require("./routes/student.route")(app);
require("./routes/admin.route")(app);
require("./routes/subscription.route")(app);
require("./routes/order.route")(app);
require("./routes/legalInfo.route")(app);
require("./routes/review.route")(app);

require("./routes/studentRating.route")(app);
require("./routes/teacherQuery.route")(app);
require("./routes/studentQuery.route")(app);
require("./routes/changeTopic.route")(app);
require("./routes/aboutUs.route")(app);
//require('./routes/subscribeTeacher.route')(app);
require("./routes/notification.route")(app);
require("./routes/notificationAdmin.route")(app);
require("./routes/studentNotification")(app);
require("./routes/payment.route")(app);
require("./routes/subject.route")(app);
require("./routes/subjectStream.route")(app);
require("./routes/category.route")(app);
require("./routes/privacy.route")(app);
require("./routes/govt-id.route")(app);
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

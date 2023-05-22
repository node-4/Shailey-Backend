// const qualificationController = require("../controllers/qualification");
// module.exports = (app) => {
//     app.post("/qualifications/qualifications", qualificationController.createQualification);
//     app.get("/qualifications/qualifications", qualificationController.getQualifications);
//     app.get("/qualifications/qualifications/:id", qualificationController.getQualification);
//     app.put("/qualifications/qualifications/:id", qualificationController.updateQualification);
//     app.delete(
//         "/qualifications/:id",
//         qualificationController.deleteQualification
//     );
// };

const express = require("express");
const router = express.Router();
const qualificationController = require("../controllers/qualification");

router.post("/qualifications", qualificationController.createQualification);
router.get("/qualifications", qualificationController.getQualifications);
router.get("/qualifications/:id", qualificationController.getQualification);
router.put("/qualifications/:id", qualificationController.updateQualification);
router.delete(
    "/qualifications/:id",
    qualificationController.deleteQualification
);

module.exports = router;

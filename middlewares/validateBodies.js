const teacherBodies = async (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(200).send({ msg: "please enter your first name" });
  }
  if (!req.body.lastName) {
    return res.status(200).send({ msg: "please enter your last name" });
  }
  if (!req.body.phoneNumber) {
    return res.status(200).send({ msg: "please enter phoneNumber" });
  }
  if (!req.body.Qualification) {
    return res.status(200).send({ msg: "please enter qualification" });
  }
  if (!req.body.class) {
    return res.status(200).send({ msg: "please enter class" });
  }
  next();
};

module.exports = { teacherBodies };

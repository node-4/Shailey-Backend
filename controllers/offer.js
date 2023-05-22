const offer = require("../models/order.model");
exports.addoffer = async (req, res) => {
  try {
    const data = {
      image: req.file.path,
    };
    console.log(data);

    const Image = await offer.create(data);
    console.log(Image);
    res.status(200).json({
      message: " Offer Added ",
      details: Image,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.deleteOffers = async (req, res) => {
  try {
    const id = req.params.id;
    await offer.deleteOne({ _id: id });
    res.status(200).send({ message: "Offers Image  deleted " });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const getOffer = await offer.find();
    res.status(200).json({
      offer: getOffer,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

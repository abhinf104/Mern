const Store = require("../models/storeModel");

const registerStore = async (req, res) => {
  console.log("request came");
  console.log(req.body);
  try {
    const {
      sellerId,
      data,
      storeName,
      businessType,
      storeLogo,
      storeBio,
      location,
      deliveryMethod,
      shippingCoverage,
      contactDetails,
      socialLinks,
    } = req.body;

    const newStore = new Store({
      sellerId,
      data,
      storeName,
      businessType,
      storeLogo,
      storeBio,
      location,
      deliveryMethod,
      shippingCoverage,
      contactDetails,
      socialLinks,
    });

    await newStore.save();

    res
      .status(201)
      .json({ message: "Store registered successfully", store: newStore });
  } catch (error) {
    res.status(500).json({ message: "Error registering store", error });
  }
};

module.exports = {
  registerStore,
};

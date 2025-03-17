const Store = require("../models/storeModel");

const editStore = async (req, res) => {
  const { sellerId } = req.params;
  const updateData = req.body;

  try {
    const updatedStore = await Store.findByIdAndUpdate(sellerId, updateData, {
      new: true,
    });

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    res.status(500).json({ message: "Error updating store", error });
  }
};

module.exports = editStore;

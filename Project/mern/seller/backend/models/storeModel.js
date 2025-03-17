const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: "sellers",
    unique: true,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  storeName: {
    type: String,
    default: "",
  },
  businessType: {
    type: String,
    default: "",
  },
  storeLogo: {
    type: String,
    default: "",
  },
  storeBio: {
    type: String,
    default: "",
  },
  location: {
    link: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      default: "",
    },
  },
  deliveryMethod: {
    type: String,
    default: "Pickup", // or "Courier" or "Any"
  },
  shippingCoverage: {
    type: String,
    default: "City", // or "State" or "Nationwide"
  },
  contactDetails: {
    phoneNumber: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
  socialLinks: {
    instagram: {
      type: String,
      default: "",
    },
    whatsapp: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
  },
});

const Store = mongoose.model("stores", storeSchema);

module.exports = Store;

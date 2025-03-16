// ---------auth-----------------
const authInitialState = {
  user: null,
  token: null,
  isLoading: null,
  error: null,
  isAuthenticated: null,
};

// -------------theme -----------
const themeInitialState = {
  isDarkMode: false,
  bgColor: "#fff",
  txtColor: "#000",
};

// ------setting ---------------
const settingInitialState = {
  isLoading: null,
  success: null,
  error: null,
  shop: {
    data: null,
    storeName: "",
    businessType: "",
    storeLogo: "",
    storeBio: "",
    location: {
      link: "",
      city: "",
      state: "",
      district: "",
      pincode: "",
    },
    deliveryMethod: "Pickup", // or "Courier" or "Any"
    shippingCoverage: "City", // or "State" or "Nationwide"
    contactDetails: {
      phoneNumber: "",
      email: "",
    },
    socialLinks: {
      instagram: "",
      whatsapp: "",
      facebook: "",
    },
  },
};

// -------products-----------
const productInitialState = {
  products: [],
  isLoading: null,
  error: null,
};

// --------order-------
const orderInitialState = {
  orders: [],
  status: "idle",
  error: null,
};

export {
  authInitialState,
  themeInitialState,
  settingInitialState,
  productInitialState,
  orderInitialState,
};

// Import the necessary modules
const ConnectDB = require("./db/connect"); // Module to connect to the database
const dotenv = require("dotenv"); // Module to load environment variables
const products = require("./model/products"); // Product model
const data = require("./product.json"); // JSON data to populate the database

// Load environment variables from a .env file into process.env
dotenv.config();

// Function to populate the database
const Populate = async () => {
  try {
    // Connect to the MongoDB database using the URI from environment variables
    await ConnectDB(process.env.MONGO_URI);

    // Delete all existing documents in the products collection
    await products.deleteMany();

    // Insert the data from product.json into the products collection
    await products.create(data);

    // Log a success message and exit the process with a success code
    console.log("Database populated successfully");
    process.exit(0);
  } catch (err) {
    // Log an error message and exit the process with a failure code
    console.log("Error in populating the database", err);
    process.exit(1);
  }
};

// Call the Populate function to execute the database population
Populate();

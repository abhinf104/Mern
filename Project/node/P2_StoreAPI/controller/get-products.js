const Product = require("../model/products");
const { StatusCodes } = require("http-status-codes");

//setting static condition
//{name: { $in: ["Abc", "abcd"] }, age: { $gte: 18 } , price: { $gte: 100, $lte: 500 }, rating: { $gte: 4, $lte: 5 } }

//setting dynamic condition
const FindProducts = async (req, res) => {
  const { featured, company, name, numericFilter, sort, field } =
    await req.query;
  console.log(featured, company, name, numericFilter, sort, field, limit, page);

  // Initialize queryObject to store dynamic query conditions
  const queryObject = {};

  // If 'featured' is defined in the query, add it to queryObject
  if (featured) {
    queryObject["featured"] = featured === "true" ? true : false;
  }
  console.log(queryObject);

  // If 'company' is defined, split it by commas and add it to queryObject
  // This allows filtering by multiple companies
  if (company) {
    const companyList = company.split(",");
    queryObject["company"] = { $in: companyList };
  }

  // If 'name' is defined, use a regex to perform a case-insensitive search
  // This allows finding similar names
  if (name) {
    queryObject["name"] = { $regex: name, $options: "i" };
  }

  // If 'numericFilter' is defined, parse it and add the conditions to queryObject
  // This allows filtering by numeric fields with various operators
  if (numericFilter) {
    const filters = numericFilter.split(",");
    console.log(filters);
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    // Regular expression to match operators
    const regEx = /\b(<|>|>=|<=|=)\b/g;

    filters.forEach((filter) => {
      const [field, operator, value] = filter.split(regEx);
      if (field && operator && value) {
        const mongoOperator = operatorMap[operator];
        if (!queryObject[field]) {
          queryObject[field] = {};
        }
        queryObject[field][mongoOperator] = Number(value);
      }
    });
  }

  // Execute the query with the constructed queryObject
  const results = await Product.find(queryObject);
  console.log(queryObject);

  // If 'sort' is defined, sort the results accordingly
  // Default sorting is by 'createdAt'-- timestamp when the document was created
  if (sort) {
    const sortList = sort.split(",").join(" ");
    results.sort(sortList);
  } else {
    results.sort("createdAt");
  }

  // Pagination: limit the number of results and skip the appropriate number of documents
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (Number(page) - 1) * limit;

  // Apply pagination to the results
  const product = await results.skip(skip).limit(limit);

  // Send the response with the products and the number of hits
  res.status(StatusCodes.OK).json({ product, nbHits: product.length });
};

module.exports = FindProducts;

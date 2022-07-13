class ApiFeatures {
  constructor(query, queryStr) {
    // this is used for initializing the values we received to the variables within the closure space
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    // REMEMBER: this.x is an object so, passing this.x to any variable is only passing its reference, to pass the full value
    // use spread operators ...
    const queryCopy = { ...this.queryStr };

    // removing unnecessary field from the query string to only search for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for rating and price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(productPerPage) {
    let currentPage = Number(this.queryStr.page) || 1;
    let skip = productPerPage * (currentPage - 1); // this tells the no. of products to be skipped based on current page

    this.query = this.query.limit(productPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;

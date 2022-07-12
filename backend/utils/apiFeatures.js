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

    this.query = this.query.find(queryCopy);

    console.log(this.query);

    return this;
  }
}

module.exports = ApiFeatures;

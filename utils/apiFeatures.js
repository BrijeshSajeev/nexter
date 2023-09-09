class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeItems = ["page", "sort", "limit", "fields"];
    excludeItems.forEach((ele) => delete queryObj[ele]);
    // console.log(queryObj); // { area: { gt: '100' } }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sort = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort("ratingsAverage");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieldStr = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fieldStr);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagenate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;

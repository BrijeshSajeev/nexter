const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const houseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Err Str : house must have name"],
    unique: true,
    trim: true,
  },
  slug: String,
  rooms: {
    type: Number,
    required: [true, "Err Str : house must have rooms"],
  },
  location: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
    max: [5, "The rating must be less then or equal to 5.0"],
    min: [1, "The name must greater then or equal to 1.0"],
    default: 4.5,
  },
  area: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Err Str : house must have price"],
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

houseSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// houseSchema.pre(/^find/, function (next) {
//   this.find({ sold: { $ne: true } });
// });

const House = mongoose.model("House", houseSchema);

module.exports = House;

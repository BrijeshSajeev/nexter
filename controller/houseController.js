const House = require("../model/houseModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllHouses = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  const features = new ApiFeatures(House.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagenate();
  const houses = await features.query;
  res.status(200).json({
    status: "success",
    results: houses.length,
    data: {
      houses,
    },
  });
});

exports.getHouse = catchAsync(async (req, res, next) => {
  const house = await House.findById(req.params.id);

  if (!house) {
    return next(new AppError("Invalid Id, Please try Again!", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      house,
    },
  });
});

exports.addHouse = catchAsync(async (req, res, next) => {
  const newHouse = await House.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      house: newHouse,
    },
  });
});

exports.updateHouse = catchAsync(async (req, res, next) => {
  const house = await House.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!house) {
    return next(new AppError("Invalid Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      house,
    },
  });
});

exports.deleteHouse = catchAsync(async (req, res, next) => {
  const house = await House.findByIdAndDelete(req.params.id);
  if (!house) {
    return next(new AppError("Invalid Id", 404));
  }
  res.status(204).json({
    status: "success",
    message: "no Content",
  });
});

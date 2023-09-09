const express = require("express");
const globalErrorController = require("./controller/errorController");
const AppError = require("./utils/appError");
const routeHouse = require("./routes/houseRoutes");
const routeUser = require("./routes/userRoutes");

const app = express();
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// app.use("/api/v1/users", routeUser);
app.use("/api/v1/houses", routeHouse);

// Middle ware for worng Urls
app.all("*", (req, res, next) => {
  next(new AppError(`can't access this ${req.originalUrl}`, 404));
});

app.use(globalErrorController);

module.exports = app;

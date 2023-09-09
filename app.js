const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const globalErrorController = require("./controller/errorController");
const AppError = require("./utils/appError");
const routeHouse = require("./routes/houseRoutes");
const routeUser = require("./routes/userRoutes");

const app = express();
app.use(helmet());

//Rate Limiting from same IP
const limitRate = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests!, try again in a hour",
});
app.use("/api", limitRate);
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
// Data Sanitization against sql-query-injection
app.use(mongoSanitize());

//Data Sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp());

app.use("/api/v1/users", routeUser);
app.use("/api/v1/houses", routeHouse);

// Middle ware for worng Urls
// app.all("*", (req, res, next) => {
//   next(new AppError(`can't access this ${req.originalUrl}`, 404));
// });

app.use(globalErrorController);

module.exports = app;

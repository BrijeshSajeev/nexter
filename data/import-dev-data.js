const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const House = require("../model/houseModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  // eslint-disable-next-line prettier/prettier
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((conn) => {
    console.log("Connection Successfull");
  });

const houses = JSON.parse(fs.readFileSync(`${__dirname}/home.json`, "utf-8"));

const importData = async () => {
  try {
    await House.create(houses);
    console.log("insered successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await House.deleteMany();
    console.log("deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

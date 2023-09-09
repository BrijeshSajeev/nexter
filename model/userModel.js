const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must contain name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "user Must contain email"],
    validate: [validator.isEmail, "provied valid email"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },

  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],

    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangeTime: {
    type: Date,
    // select: false,
  },
  //   passwordResetToken: String,
  //   passwordResetExpires: Date,
  //   active: {
  //     type: Boolean,
  //     default: true,
  //     select: false,
  //   },
});

userSchema.pre("save", function (next) {
  if (!this.isModified || this.isNew) return next();
  this.passwordChangeTime = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

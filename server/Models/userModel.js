const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, minLength: 3, maxLength: 30 },
    email: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 200,
      unique: true,
    },
    username: { type: String, require: true },
    password: { type: String, require: true, minLength: 3, maxLength: 1024 },
  },
  {
    timestamps: true,
  }
);
let User = mongoose.model("User", userSchema);
module.exports = User;

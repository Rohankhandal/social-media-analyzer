const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  text: String,
  createdAt: Date,
});

module.exports = mongoose.model("Document", DocumentSchema);

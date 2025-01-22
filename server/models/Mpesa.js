const mongoose = require("mongoose");

const MpesaSchema = new mongoose.Schema(
  {
    userId: String,
    phone: Number,
    code: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mpesa", MpesaSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name : {
      type : 'String',
      required : false,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
    imageUrl: {
      type: "String",
      required: false,
    },
    role : {
      type: "String",
      required: false,
    },
    resetToken : String,
    resetTokenExpiration : Date,
    product: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    address: [
      {
        houseNo: {
          type: "Number",
          required: true,
        },
        street: {
          type: "String",
          required: true,
        },
        city: {
          type: "String",
          required: true,
        },
        pincode: {
          type: "Number",
          required: true,
        },
        contactNo: {
          type: "Number",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


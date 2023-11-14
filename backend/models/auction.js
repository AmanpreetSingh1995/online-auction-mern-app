const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
    product: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    User : [
      {
        userId : {
          type: Schema.Types.ObjectId,
          ref : "User",
          required: true,
        }
      }
    ],
    productStatus : {   // Ongoing or Sold
      type : "String",
      required: true,
    },
    biddingStart : {
        type : "Date",
        required : true,
    },
    BiddingEnd : {
      type : "Date",
      required : true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auction", auctionSchema);

const { validationResult } = require("express-validator");
const fs = require("fs/promises");
const Product = require("../models/product");
const { fileDeleteHandler } = require("../util/file-delete");
const HttpError = require("../util/http-error");


exports.postAddProduct = async (req, res, next) => {
  const valResult = validationResult(req);
    if(!valResult.isEmpty()){
        return next(new HttpError(valResult.errors[0].msg, 422));
    }

  const { title, price, category, description } = req.body;

  try {
    const product = await Product.create({
      title,
      imageUrl: req.file.path,
      price,
      description,
    });
    res.status(201).json({ product: product });
  } catch (err) {
    next(new HttpError("Internals Server Error", 500)); //will go to next middleware                                       // at server.js file
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products.reverse() });
  } catch (err) {
    next(new HttpError("Internal Server Error", 500));
  }
};

exports.updateProduct = async (req, res, next) => {
  const { title, price, description } = req.body;
  const prodId = req.params.prodId;
  try {

    const filePath = await Product.findById(prodId).select({
      imageUrl: 1,
      _id: 0,
    });

    if(req.file){
      const isFileDeleted = await fileDeleteHandler(filePath.imageUrl);
        if(!isFileDeleted){
          return next(new HttpError("File Not Found", 404));
        }
    }
    const product = await Product.findByIdAndUpdate(prodId, 
    { title,
      imageUrl : req.file ? req.file.path : filePath.imageUrl,
       price, 
       description, 
       });
       console.log(product);
    res.status(200).json({ product : product});
  } catch (err) {
     next(new HttpError("Internal Server Error", 500));
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const filePath = await Product.findById(req.params.prodId).select({
      imageUrl : 1,
      _id : 0,
    });

    const isFileDeleted = await fileDeleteHandler(filePath.imageUrl);
    if(isFileDeleted) {
      const product = await Product.findByIdAndDelete(req.params.prodId);
      res.status(200).json({ product: product });
    } else {
      return next(new HttpError("File Not Found", 400));
    }
  } catch (err) {
     next(new HttpError("Internal Server Error", 500));
  }
};
const express = require("express");
const { check} = require("express-validator");
const router = express.Router();

const {
  postAddProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/admin");
const isAuth = require("../middlewares/is-Auth");
const upload = require("../middlewares/file-upload");


router.post("/add-product", 
  [
    check("title")
    .notEmpty()
    .isAlpha()
    .withMessage("title should have alphabets only"),
    check("price").notEmpty().isNumeric(),
    check("description").notEmpty().isLength({ min: 5, max:30 }),
  ],
  isAuth,
  upload.single("imageUrl"),
 postAddProduct);

router.put("/update-product/:prodId", isAuth,  upload.single("imageUrl"), updateProduct);

router.delete("/delete-product/:prodId", isAuth, deleteProduct);

module.exports = router;

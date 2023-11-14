const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const HttpError = require("../util/http-error");

exports.postSignup = async (req, res, next) => {
    const { name, email, password , imageUrl, product, address } = req.body;

  //1) check if the user already exists or not
  const user = await User.findOne({ email: email });
  if (user) {
      return next(new HttpError( "User Already exists!", 409));
  }
  //2) Encrypt the password of the user
  let hashedPassword;
  try {
      hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
      next(new HttpError("Internal Server Error", 500));
  }

  //3) Store the email and password in the database
  try {
      const users = await User.find();

      if (users.length == 0) {
          const user = await User.create({
              name: name,
              email: email,
              password: hashedPassword,
              imageUrl: imageUrl,
              role: 'admin',
              product : product,
              address: address,
          });
      } else {
          const user = await User.create({
              name: name,
              email: email,
              password: hashedPassword,
              imageUrl: imageUrl,
              role: 'customer',
              product : product,
              address: address,
          });
      }
  } catch (err) {
      next(new HttpError("Internal Server Error", 500));
  }
  return res.status(200).json({ message: "Account created sucessfully" });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  //1) check if the user already exists or not

  const user = await User.findOne({ email: email });
  if (!user) {
      return next(new HttpError("Invalid email or password", 401));
  }

  //2) Check if the password is correct or not
  try { 
      const doMatches = await bcrypt.compare(password, user.password);
      if (doMatches) {
          //Creating JWT
          const token = jwt.sign(
              { userId: user._id, role: user.role },
              process.env.JWT_KEY,
              {
                  expiresIn: Date.now() + 3600000,
              });
          res.status(200).json({ token: token, role: user.role });
      } else {
          return next(new HttpError("Invalid email or password", 401));
      }
  } catch (err) {
      next(new HttpError("Internal Server Error", 500));
  }
};


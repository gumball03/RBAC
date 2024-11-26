const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { canRegister } = require("../middlewares/accesscontrol");
const httpStatus = require("../utils/httpStatus");
const AuthService = require("../services/authService");

router.post("/createRoot", async (req, res) => {
  try {
    const userObject = {
      email: "root@root.com",
      password: "123456", // isko hatana hai mujhe
      userType: "Admin",
    };
    const dispatcher = { displayName: "Me" };
    const authServiceInstance = new AuthService();

    const { newUser, newUserData } = await authServiceInstance.Register(
      userObject,
      dispatcher
    );

    return res.status(httpStatus.OK).send({ newUser, newUserData });
  } catch (error) {
    !error.status
      ? (error.status = httpStatus.INTERNAL_SERVER_ERROR)
      : error.status;

    return res.status(error.status).send(error.message);
  }
});

router.post("/register", verifyToken, canRegister, async (req, res) => {
  try {
    const userObject = req.body;
    const dispatcher = req.decoded;
    const authServiceInstance = new AuthService();
    const { newUser, newUserData } = await authServiceInstance.Register(
      userObject,
      dispatcher
    );

    return res.status(httpStatus.OK).send({ newUser, newUserData });
  } catch (error) {
    !error.status
      ? (error.status = httpStatus.INTERNAL_SERVER_ERROR)
      : error.status;

    return res.status(error.status).send(error.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInput = { inputEmail: email, inputPassword: password };
    const authServiceInstance = new AuthService();
    const { signedToken } = await authServiceInstance.Login(userInput);

    return res.status(httpStatus.OK).send({ token: signedToken });
  } catch (error) {
    !error.status
      ? (error.status = httpStatus.INTERNAL_SERVER_ERROR)
      : error.status;

    return res.status(error.status).send(error.message);
  }
});

module.exports = router;

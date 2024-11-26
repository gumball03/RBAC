const bcrypt = require("bcryptjs");
const jwtModule = require("../utils/jwtModule");
const User = require("../models/User");
const logger = require("../../config/logger");
const {
  EmailExisted,
  EmailOrPasswordIncorrect,
} = require("../utils/customError");

class AuthService {
  Register = async (userInput, dispatcher) => {
    const { email, password } = userInput;

    userInput.password = bcrypt.hashSync(password, 8);

    try {
      let user = await User.findOne({ email }).exec();
      if (user) {
        throw new EmailExisted(`Email ${email} already existed`);
      }

      let newUser = await User.create({
        ...userInput,
        createdBy: dispatcher.displayName,
        updatedBy: dispatcher.displayName,
      });

      const message = "Create User";
      const metadata = {
        issuer: dispatcher.displayName,
        action: "register: create user",
        payload: newUser,
      };
      logger.info({ message, metadata });

      return { newUser };
    } catch (error) {
      const message = error.message;
      const metadata = {
        issuer: dispatcher.displayName,
        action: "register",
        payload: userInput,
      };
      logger.error({ message, metadata });

      throw error;
    }
  };

  Login = async (userInput) => {
    const { inputEmail, inputPassword } = userInput;

    try {
      let user = await User.findOne({ email: inputEmail }).exec();
      if (!user) {
        throw new EmailOrPasswordIncorrect(`Email or password incorrect`);
      }

      const {
        _id,
        email,
        password,
        nickname,
        firstChangeOfPassword,
        lastName,
        userType,
        avatar,
      } = user;
      const passwordMatch = bcrypt.compareSync(inputPassword, password);

      if (!passwordMatch) {
        throw new EmailOrPasswordIncorrect(`Email or password incorrect`);
      }

      // JWT signature
      const payload = {
        id: _id,
        userType: userType,
        email: email,
        displayName: nickname + " " + lastName,
        avatar: avatar,
        firstChangeOfPassword: firstChangeOfPassword,
      };
      const signingOptions = { subject: email };
      const signedToken = jwtModule.sign(payload, signingOptions);

      const message = "User Login Success";
      const metadata = {
        issuer: nickname + " " + lastName,
        action: "user login",
      };
      logger.info({ message, metadata });
      return { signedToken };
    } catch (error) {
      const message = error.message;
      const metadata = {
        issuer: "unknown",
        action: "user attempt login",
        payload: { email: inputEmail },
      };
      logger.error({ message, metadata });
      throw error;
    }
  };
}
module.exports = AuthService;

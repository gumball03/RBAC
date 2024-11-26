const AccessControl = require("accesscontrol");
const grants = require("../utils/userRoles");
const httpStatus = require("../utils/httpStatus");
const logger = require("../../config/logger");
const ac = new AccessControl(grants);

let logSuccessCase = false;

canRegister = (req, res, next) => {
  const permission = ac.can(req.decoded.userType).createAny("User");

  if (!permission.granted) {
    const message = "No permission to access resources";
    const metadata = {
      issuer: req.decoded.displayName,
      action: "register",
      payload: req.body,
    };
    logger.error({ message, metadata });
    res.status(httpStatus.FORBIDDEN).send({ message, metadata });
  } else {
    if (logSuccessCase) {
      const message = "Permission granted to access resources";
      const metadata = {
        issuer: req.decoded.displayName,
        action: "register",
        payload: req.body,
      };
      logger.info({ message, metadata });
    }
    next();
  }
};
module.exports = {
  canRegister,
};

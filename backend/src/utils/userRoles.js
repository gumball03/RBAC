const grants = {
  Admin: {
    User: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  Normal: {
    User: {
      "read:own": ["email", "password"],
      "update:own": ["email", "password"],
    },
  },
};
module.exports = grants;

const UserService  = require("../services/user-services");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new User",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to create a User",
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
};

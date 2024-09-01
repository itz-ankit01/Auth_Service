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
    // console.log(error);
    return res.status(error.statusCode).json({
      data: {},
      message: error.message,
      success: false,
      err: error.explanation,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      data: response,
      message: 'signned In successfully',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Not able to sign In",
      success: false,
      err: error,
    });
  }
}

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: response,
      message: 'user is authenticated, token is valid',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Invalid token, not authenticated",
      success: false,
      err: error,
    });
  }
}

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      err: {},
      message: 'Successfully fetched whether the user is admin or not',
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Something went wrong , isAdmin func",
      success: false,
      err: error,
    });
  }
}

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin
};

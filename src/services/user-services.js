const UserRepository = require("../repository/user-repository");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log(`something went wrong went in the service layer`);
      throw error;
    }
  }

  async signIn(userEmail, userPlainPassword) {
    try {
      // step 1 -> fetch the user by Email
      const user = await this.userRepository.getByEmail(userEmail);
      // step 2 -> compare incoming plain password with the stores encrypted password
      const passwordMatch = this.checkPassword(
        userPlainPassword,
        user.password
      );

      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect Password" };
      }

      // step 3 -> if password match then create a token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log(`something went wrong went in sign Process`);
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verrifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log(`something went wrong went in Auth Process`);
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log(`something went wrong went in token creation`);
      throw error;
    }
  }

  verrifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log(`something went wrong went in token validation`);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log(`something went wrong went in Password comparison`);
      throw error;
    }
  }
}

module.exports = UserService;

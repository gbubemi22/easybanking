import { StatusCodes } from "http-status-codes";
import ConflictError from "../errors/conflict.js";
import { validatePasswordString } from '../utils/password.js'
import userRepository from '../respository/userRespositroy.js'
import jwt from 'jsonwebtoken';

const authController = {


  phone_numberToAccountNumber: (phoneNumber) => {
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Convert the numeric phone number to an integer
    const accountNumber = parseInt(numericPhoneNumber);

    return accountNumber;
  },

  register: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      account_number,
    } = req.body;


    validatePasswordString(password);

    try {
      const check = await userRepository.getUserByEmail(email);

      if (check) {
        throw new ConflictError(`email already in use`);
      }
      if (check && check.phone_number) {
        throw new ConflictError(`phone number already in use`);
      }
      const account_number = authController.phone_numberToAccountNumber(phone_number);
      const user = await userRepository.createUser(
        first_name,
        last_name,
        email,
        password,
        phone_number,
        account_number
      );
      const token = user.generateJWT();

      res.status(StatusCodes.CREATED).json({ user, token });
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Registration failed" });
    }
  },


  generateAccessToken:function (user){
    // Create an access token with a short expiration time
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m', // Access token expires in 15 minutes
    });
    return accessToken;
  },
  
   generateRefreshToken:function(user) {
    // Create a refresh token with a longer expiration time
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d', // Refresh token expires in 7 days
    });
    return refreshToken;
  },
 


  login: async(req, res) => {
    const { email, password } = req.body;
    
    const user = await userRepository.getUserByEmail(email);

    if (!email || !password) {
      throw new CustomError.BadRequestError("Please provide email and password");
    }
      
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    const accessToken = await authController.generateAccessToken(user);
    const refreshToken = await authController.generateRefreshToken(user);

    res.status(StatusCodes.OK).json({ user, accessToken, refreshToken });
    
  },


  


  updateRefreshToken: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new CustomError.BadRequestError("Please provide a refresh token");
    }

    
      const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      // Fetch the user based on the decoded token
      const user = await userRepository.getUserById(decodedToken.id);

      
      const newRefreshToken = generateRefreshToken(user);

      res.status(StatusCodes.OK).json({ refreshToken: newRefreshToken });
   
  },

};

export default authController;

import { StatusCodes } from "http-status-codes";
import userRepository from '../respository/userRespositroy.js';



const userCrontroller = {
 
     getAllUsers: async (req, res) => {
          const users = await userRepository.getAllUsers()

          res.status(StatusCodes.OK).json({
               count: users.length,
               users: users
          })
     },

     getOneUserById: async(req, res) => {
          const { id } = req.params;

          const user = await userRepository.getUserByID({id: id});

          res.status(StatusCodes.OK).json(user);
     }
}


export default userCrontroller


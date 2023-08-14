import express from 'express';
import userCrontroller from '../controller/userController.js';
import {
     verifyToken,
     verifyTokenAndAuthorization,
     verifyTokenAndAdmin,
   } from '../middleware/jwt_helper.js'






const router = express.Router();




router.get('/',verifyToken,authorizePermissions('user'),userCrontroller.getAllUsers)
router.get('/:id', userCrontroller.getOneUserById)

// Add the prefix to all routes
const prefix = '/api/v1/users';
router.use(prefix, router);


export default router;
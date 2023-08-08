import jwt  from 'jsonwebtoken'
import { StatusCodes }  from 'http-status-codes'
import  constant  from '../constant/index.js'
import UnauthorizedError from '../errors/unauthorized.js'



export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      next(new UnauthorizedError("Invalid token"));
    }
  } else {
    next(new UnauthorizedError("Token not provided"));
  }
};



export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.type === constant.ACCOUNT_TYPES.USER || req.user.id === req.params.id) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json("You are not allowed to perform this action!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.type === constant.ACCOUNT_TYPES.ADMIN) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json("You are not allowed to perform this action!");
    }
  });
};



// const authenticationMiddleware = async (req, res, next) => {
//   // check header
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer')) {
//     throw new UnauthenticatedError('Token not valid');
//   }
//   const token = authHeader.split(' ')[1];

//   try {
//     // verify token
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     // check if the token is blacklisted
  
//     // attach the user to the request object
//     const user = await User.findById(payload.id).select('-password');
//     if (!user) {
//       throw new UnauthenticatedError('User not found');
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error instanceof jwt.TokenExpiredError) {
//       throw new UnauthenticatedError('Token expired');
//     } else if (error instanceof jwt.JsonWebTokenError) {
//       throw new UnauthenticatedError('Token invalid');
//     } else {
//       next(error);
//     }
//   }
// };


export default {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  
};



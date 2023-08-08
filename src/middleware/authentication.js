import UnauthenticatedError from '../errors/unauthenticated.js';
import UnauthorizedError from '../errors/unauthorized.js'
import { isTokenValid } from '../utils/isTokenvalid.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  try {authenticateUser
    const {  id, type } = isTokenValid({ token });
    req.user = {  id, type };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};
export const authorizePermissions = (...type) => {
  return (req, res, next) => {
    if (!type.includes(req.user.type)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};


  


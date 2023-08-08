import UnauthenticatedError from '../errors/unauthenticated.js';
import UnauthorizedError from '../errors/unauthorized.js'
import { isTokenValid } from '../utils/isTokenvalid.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  try {
    const {  id, type } = isTokenValid({ token });
    req.user = {  id, type };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

export const authorizePermissions = (...allowedAccountTypes) => {
  return (req, res, next) => {
    const userAccountType = req.user.type;

    if (!allowedAccountTypes.includes(userAccountType)) {
      throw new UnauthorizedError(
        'Unauthorized to access this route'
      );
    }

    next();
  };
};


  


import jwt from 'jsonwebtoken';
import UnauthenticatedError from '../errors/unauthenticated.js';

export const isTokenValid = ({ token }) => {
  try {
    if (!token) {
      throw new UnauthenticatedError('Token is missing');
    }

    // Replace 'YOUR_ACCESS_TOKEN_SECRET' with your actual secret key
    const decoded = jwt.verify(token, process.env.JWT_SECT);

    // You can extract userId and type from the decoded token
    const { userId, type } = decoded;

    return { userId, type };
  } catch (error) {
    throw UnauthenticatedError('Invalid token');
  }
};

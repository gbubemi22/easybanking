import express from 'express';
import authController from '../controller/authController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Add the prefix to all routes
const prefix = '/auth';
router.use(prefix, router);

export default router;
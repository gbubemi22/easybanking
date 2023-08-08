import express from 'express';
import transfer from '../controller/transactionController.js';


const router = express.Router();

router.post('/transfer', transfer)


const prefix = '/api/v1/transactions';
router.use(prefix, router)



export default router;
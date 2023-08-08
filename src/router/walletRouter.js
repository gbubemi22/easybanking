import express from 'express';
import wallectController from '../controller/walletController.js';


const router = express.Router();


router.post('/', wallectController.createNewWallet);

const prefix = '/api/v1/wallets';
router.use(prefix, router)



export default router;
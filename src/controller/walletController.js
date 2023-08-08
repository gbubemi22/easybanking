import { StatusCodes } from "http-status-codes";
import walletRepository from '../respository/walletRepository.js';
import userRepository from '../respository/userRespositroy.js'

const wallectController = {
     createNewWallet: async (req, res) => {
    
        const { account_number, id } = req.body;
    
        const checkWallet = await walletRepository.getWalletByAccountNumber(id);
    
        if (checkWallet) {
          throw new ConflictError(`Account number already exists`);
        }
    
        const user = await userRepository.getUserByID(id);
    
        const userAccountNumber = user.account_number;
    
        const wallet = await walletRepository.createWallet(userAccountNumber, id);
        
        res.status(StatusCodes.CREATED).json(wallet);
      }
        
}


export default wallectController;
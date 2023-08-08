import Wallet from "../model/Wallet.js";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from '../errors/bad-request.js';


const walletRepository = {
     createWallet: async(
          account_number,
          id,
     ) => {
          const wallet = await Wallet({
               account_number: account_number,
               id: id,
          })

          return wallet;
     },

     getAllWallet: async() => {
          return await Wallet.find({})
     },

     getWalletByID: async (id) => {
          const wallet = await Wallet.findById(id); 
          if (!wallet) {
            throw new NotFoundError(`Wallet not found`);
          }
          return wallet;
        },

        getWalletByAccountNumber: async (id) => {
          const wallet = await Wallet.findOne({ id }); 
          if (wallet) {
            throw new BadRequestError(`Wallet already exists`);
          }
          return wallet;
        },
}


export default walletRepository;
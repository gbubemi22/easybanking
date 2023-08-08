/**
 * @param {decimal128} amount - in decimal
 * @param {String} username
 * @param {String} purpose
 * @param {String} reference
 * @param {String} summary
 * @param {String} trnxSummary
 * @returns {object} custom response
*/

import { StatusCodes }  from 'http-status-codes';

import Wallets  from '../model/Wallet.js';
import Transactions  from "../model/Transaction.js";




export const creditAccount = async ({ amount, account_number, purpose, reference, summary, trnxSummary, session }) => {
     const wallet = await Wallets.findOne({ account_number: account_number })
     if (!wallet) {
          return {
               status: false,
               statusCode: StatusCodes.NOT_FOUND,
               message: `User ${account_number} doesn\'t exist`
          }
     };


     const updatedWallet = await Wallets.findOneAndUpdate({ account_number }, { $inc: { balance: amount } }, { session });

     const transaction = await Transactions.create([{
          trnxType: 'CR',
          purpose,
          amount,
          account_number,
          reference,
          balanceBefore: Number(wallet.balance),
          balanceAfter: Number(wallet.balance) + Number(amount),
          summary,
          trnxSummary
     }], { session });


     console.log(`Credit successful`)


     return {
          status: true,
          statusCode: StatusCodes.OK,
          message: 'Credit successful',
          data: { updatedWallet, transaction }
     }


};


export const debitAccount = async ({ amount, account_number, purpose, reference, summary, trnxSummary, session }) => {
     const wallet = await Wallets.findOne({ account_number });
     if (!wallet) {
          return {
               status: false,
               statusCode: StatusCodes.NOT_FOUND,
               message: `User ${account_number} doesn\'t exist`
          }
     };

     if (Number(wallet.balance) < amount) {
          return {
               status: false,
               statusCode: StatusCodes.BAD_REQUEST,
               message: `User ${account_number} has insufficient balance`
          }
     }

     const updatedWallet = await Wallets.findOneAndUpdate({ account_number }, { $inc: { balance: -amount } }, { session });
     const transaction = await Transactions.create([{
          trnxType: 'DR',
          purpose,
          amount,
          account_number,
          reference,
          balanceBefore: Number(wallet.balance),
          balanceAfter: Number(wallet.balance) - Number(amount),
          summary,
          trnxSummary
     }], { session });

     console.log(`Debit successful`);
     return {
          status: true,
          statusCode: StatusCodes.OK,
          message: 'Debit successful',
          data: { updatedWallet, transaction }
     }
}





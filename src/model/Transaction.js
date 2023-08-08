import  mongoose from "mongoose";




const TransactionSchema = new mongoose.Schema(
     {
          tranxType: {
               type: String,
               required: false,
               enum: ["CR", "DR"],
          },
          purpose: {
               type: String,
               enum: ["payment", "deposite", "withdrawal"],
               required: true,
          },
          amount: {
               type: mongoose.Decimal128,
               required: true,
               deafult: 0.0,
          },
          walletNumber: {
               type: mongoose.Schema.ObjectId,
               type: String,
               ref: "Wallets",
          },
          reference: {
               type: String,
               required: true,
          },
          balanceBefore: {
               type: mongoose.Decimal128,
               required: true,
          },
          balanceAfter: {
               type: mongoose.Decimal128,
               required: true,
          },
          summary: {
               type: String,
               required: true,
          },
          trnxSummary: {
               type: String,
               required: true,
          },
          status: {
               type: String,
               enum: ['success', 'pending', 'completed', 'cancelled']
          }
     },
     { timestamps: true }
);

export default mongoose.model("Transactions", TransactionSchema);
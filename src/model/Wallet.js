import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      
    },
    account_number: {
      type: Number,
      required: true,
      trim: true,
      immutable: true,
      unique: true,
    },
    balance: {
      type: mongoose.Decimal128,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", WalletSchema);
export default Wallet;

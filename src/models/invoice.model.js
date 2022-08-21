const { default: mongoose } = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceDate: { type: Date, required: true },
    invoiceNumber: { type: Number, required: true, unique: true },
    invoiceAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('invoice', invoiceSchema);

// Model includes
// 1. Invoice Date.
// 2. Invoice Number.
//  3.Invoice Amount.

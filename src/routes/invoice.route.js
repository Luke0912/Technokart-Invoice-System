const express = require('express');
const router = express.Router();

const {
  getInvoices,
  createInvoice,
  deleteInvoice,
  editInvoice,
} = require('../controllers/invoice.controller');

router.get('/', getInvoices);
router.post('/createInvoice', createInvoice);
router.delete('/deleteInvoice/:invoiceNumber', deleteInvoice);
router.patch('/editInvoice/:invoiceNumber', editInvoice);

module.exports = router;

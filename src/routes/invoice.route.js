const express = require('express');
const router = express.Router();

const {
  getInvoices,
  deleteInvoice,
  createInvoices,
} = require('../controllers/invoice.controller');

router.get('/', getInvoices);
router.post('/createInvoice', createInvoices);
router.delete('/deleteInvoice/:invoiceNumber', deleteInvoice);

module.exports = router;

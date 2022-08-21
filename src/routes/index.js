const express = require('express');
const invoiceRoute = require('./invoice.route');

const router = express.Router();

router.use('/invoices', invoiceRoute);

module.exports = router;

const { default: mongoose } = require('mongoose');

const httpStatus = require('http-status');

const Invoice = require('../models/invoice.model');

//Gets all the Invoices in response

const getInvoices = async (req, res, err) => {
  const { startDate, endDate } = req.query;
  try {
    if (startDate && endDate) {
      var invoices = await Invoice.find({
        invoiceDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
      res.status(httpStatus.OK).send(invoices);
    } else {
      const invoice = await Invoice.find().lean().exec();
      return res.status(httpStatus.OK).send(invoice);
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

// Creates the invoices with the basic Validation required.
// The Invoice date should not be
// greater than the invoice date of previous or next
// invoice number.

const createInvoice = async (req, res) => {
  try {
    let isValid = true;
    let previousInvoice = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber - 1,
    });
    if (
      previousInvoice &&
      new Date(previousInvoice.invoiceDate) >= new Date(req.body.invoiceDate)
    ) {
      isValid = false;
    }
    if (!isValid) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Please Enter Valid Invoice Date' });
    }
    let nextInvoice = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber + 1,
    });
    if (
      nextInvoice &&
      new Date(nextInvoice.invoiceDate) <= new Date(req.body.invoiceDate)
    ) {
      isValid = false;
    }
    if (!isValid) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Please Enter Valid Invoice Date' });
    }
    const invoice = await Invoice.create(req.body);
    return res.status(httpStatus.OK).send(invoice);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

// Delete the invoice which is sent in the params

const deleteInvoice = async (req, res) => {
  const { invoiceNumber } = req.params;
  try {
    const invoice = await Invoice.findOneAndDelete({ invoiceNumber });
    return res.status(httpStatus.OK).send(invoice);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

// Updates the invoices with the basic Validation involved at the time of invoice creation.
// The Invoice which needs to be updated it's date should not
// greater than the invoice date of previous or next
// invoice number

const editInvoice = async (req, res) => {
  const { invoiceNumber } = req.params;
  try {
    let isValid = true;
    let previousInvoice = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber - 1,
    });
    if (
      previousInvoice &&
      new Date(previousInvoice.invoiceDate) >= new Date(req.body.invoiceDate)
    ) {
      isValid = false;
    }
    if (!isValid) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'Cannot Update: This Update is out of basic validation',
      });
    }
    let nextInvoice = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber + 1,
    });
    if (
      nextInvoice &&
      new Date(nextInvoice.invoiceDate) <= new Date(req.body.invoiceDate)
    ) {
      isValid = false;
    }
    if (!isValid) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'Cannot Update: This Update is out of basic validation',
      });
    }
    var invoice = await Invoice.findOneAndUpdate({ invoiceNumber }, req.body);
    var nInvoice = await Invoice.findOne({ invoiceNumber });
    res.status(httpStatus.OK).send(nInvoice);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
};


module.exports = {
  getInvoices,
  createInvoice,
  deleteInvoice,
  editInvoice,
};

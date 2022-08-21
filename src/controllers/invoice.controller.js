const { default: mongoose } = require('mongoose');

const httpStatus = require('http-status');

const Invoice = require('../models/invoice.model');

const getInvoices = async (req, res, err) => {
  try {
    const invoice = await Invoice.find().lean().exec();
    return res.status(httpStatus.OK).send(invoice);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

const createInvoices = async (req, res) => {
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

const deleteInvoice = async (req, res) => {
  const { invoiceNumber } = req.params;
  try {
    const invoice = await Invoice.findOneAndDelete({ invoiceNumber });
    return res.status(httpStatus.OK).send(invoice);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = { getInvoices, createInvoices, deleteInvoice };

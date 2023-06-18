const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enquirySchema = new Schema({

  address: {
    type: String,
    required: false
  },
  brand_value: {
      type: String,
      required: false
  },
  email: {
    type: String,
    required: false
  },
  entryDate: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  service_value: [],
  staffName: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  completedDate: {
    type: String,
    required: false
  },
  deliveryDate: {
    type: String,
    required: false
  },
  payment_status: {
    type: String,
    required: false
  },
  pcbType: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  qrCodeURL: {
    type: String,
    required: false
  },
  reason: {
    type: String,
    required: false
  },
  technician: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Enquiries', enquirySchema,"Enquiries");

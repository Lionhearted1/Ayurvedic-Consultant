const mongoose = require('mongoose');


const medicineSchema = new mongoose.Schema({
  id: Number,
  medicine: String,
  reference: String,
  packSize: String,
  indications: [String], 
  dosage: String,
  precaution: [String], 
  opdIp: String,
  category: String,
});

module.exports = mongoose.model('Medicine', medicineSchema);

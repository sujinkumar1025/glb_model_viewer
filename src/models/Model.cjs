const mongoose = require('mongoose');

// Define the Model schema
const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true },  // Make sure the filename field is required
});

// Create and export the model
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;

const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  children: [{ 
    id: { type: String },
    name: { type: String },
    description: { type: String },
    url: { type: String },
    children: [mongoose.Schema.Types.Mixed] // for nested children
  }]
});

module.exports = mongoose.model('Document', documentSchema);
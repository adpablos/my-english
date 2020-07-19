const mongoose = require('mongoose');
const WordSchema = new mongoose.Schema({  
  english: String,
  spanish: String
});
module.exports = mongoose.model('Word', WordSchema);
const mongoose = require('mongoose');

const DatabaseSchema = new mongoose.Schema({},
    {strict:false}
);

module.exports = mongoose.model('Database', DatabaseSchema);
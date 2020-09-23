const mongoose = require('mongoose');

const HeroesSchema = new mongoose.Schema({},
    {strict:false}
);

module.exports = mongoose.model('Heroes', HeroesSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 10000
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;

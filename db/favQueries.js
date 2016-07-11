const knex = require('./knex.js')

function Favs(){
  return knex('favourites');
};

function getAllFavs() {
  return Favs().select();
};

function getFavs(userID) {
  return Favs().where('user_id', parseInt(userID));
};

function add(userID, recipeID) {
  return Favs().insert({user_id: userID, recipe_id: recipeID})
};

module.exports = {
  getAllFavs: getAllFavs,
  getFavs: getFavs,
  add: add
};
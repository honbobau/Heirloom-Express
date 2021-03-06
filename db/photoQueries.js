const knex = require('./knex.js')

function Photos(){
  return knex('photos');
};

function getAll() {
  return Photos().select();
};

function getPhotos(recipeID) {
  return Photos().where('recipe_id', parseInt(recipeID));
};

function add(body) {
  return Photos().insert(body, 'id')
};

function deleteID(photoID) {
  return Photos().where('id', parseInt(photoID)).del();
}

module.exports = {
  getAll: getAll,
  getPhotos: getPhotos,
  add: add,
  deleteID: deleteID
};
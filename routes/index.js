const express = require('express');
const router = express.Router();
const path = require('path');
const userQueries = require('../db/userQueries')
const recipeQueries = require('../db/recipeQueries')
const favQueries = require('../db/favQueries')
const likeQueries = require('../db/likeQueries')
const followQueries = require('../db/followQueries')
const cors = require('cors')

// Get all users
router.get('/users', function(req, res, next) {
  userQueries.getAll()
  .then(function(users){
    res.status(200).json(users);
  })
  .catch(function(error){
    next(error);
  });
});

router.get('/recipes', function(req, res, next){
  recipeQueries.getAll()
  .then(function(recipes){
    res.status(200).json(recipes);
  })
  .catch(function(error){
    next(error);
  });
});


// Get single user
router.get('/user/:id', function (req, res, next) {
  userQueries.getSingle(req.params.id)
  .then(function(users){
    res.status(200).json(users);
  })
  .catch(function(error){
    next(error);
  });
});


// Get recipes associated to user_id
router.get('/user/:user_id/recipes', function (req, res, next) {
  recipeQueries.getRec(req.params.user_id)
  .then(function(users){
    res.status(200).json(users);
  })
  .catch(function(error){
    next(error);
  });
});


// Get a single recipe
router.get('/recipes/:id', function (req, res, next) {
  recipeQueries.getSingle(req.params.id)
  .then(function(recipes){
    res.status(200).json(recipes);
  })
  .catch(function(error){
    next(error);
  });
});

// Get favourites associated to a user_id
router.get('/user/:user_id/favourites', function (req, res, next) {
  favQueries.getFavs(req.params.user_id)
  .then(function(users){
    res.status(200).json(users);
  })
  .catch(function(error){
    next(error);
  });
});


// Get likes associated to a user_id
router.get('/user/:user_id/likes', function (req, res, next) {
  likeQueries.getLikes(req.params.user_id)
  .then(function(users){
    res.status(200).json(users);
  })
  .catch(function(error){
    next(error);
  });
});

// Get followers associated to a user_id
router.get('/user/:user_id/follows', function (req, res, next) {
  followQueries.getFollows(req.params.user_id)
  .then(function(users){
    res.status(200).json(users);
  })
  .catch(function(error){
    next(error);
  });
});


// See README.md for proper form format when submitting post requests
router.post('/users', function(req, res, next){
  userQueries.add(req.body)
  .then(function(userID){
    return userQueries.getSingle(userID);
  })
  .then(function(users){
    res.status(200).json(users)
  })
  .catch(function(error){
    next(error);
  });
});

router.post('/recipes', function (req, res, next){
  recipeQueries.add(req.body)
  .then(function(recipeID){
    return recipeQueries.getSingle(recipeID);
  })
  .then(function(recipes){
    res.status(200).json(recipes)
  })
  .catch(function(error){
    next(error);
  });
});

router.post('/user/:user_id/recipe/:recipe_id/favourites', function(req, res, next){
  favQueries.add(req.params.user_id, req.params.recipe_id)
  .then(function(favourites){
    res.status(200).json()
  })
  .catch(function(error){
    next(error);
  })
})

router.post('/user/:user_id/recipe/:recipe_id/likes', function(req, res, next){
  likeQueries.add(req.params.user_id, req.params.recipe_id)
  .then(function(likes){
    res.status(200).json()
  })
  .catch(function(error){
    next(error)
  })
})

router.post('/user/:user_id/followUser/:following_id/follows', function(req, res, next){
  followQueries.add(req.params.user_id, req.params.following_id)
  .then(function(follows){
    res.status(200).json()
  })
  .catch(function(error){
    next(error)
  })
})

module.exports = router;

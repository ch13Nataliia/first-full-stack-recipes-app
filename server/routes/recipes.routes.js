const path = require('path');
const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe,
} = require('../controllers/recipe.controller');

const MIN_STR_LEN = 2;
const MAX_STR_LEN = 10000;

const MIN_TITLE_LEN = 2;
const MAX_TITLE_LEN = 50;

const MIN_AUTHOR_LEN = 2;
const MAX_AUTHOR_LEN = 100;

const MIN_DESCRIPTION = 0;
const MAX_DESCRIPTION = 10000;

router
  .get('/:id?', getRecipes)

  .post(
    '/',

    body('title')
      .not()
      .isEmpty()
      .withMessage("Value for 'title' is required")
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'title' must be of type string")
      .isLength({ min: MIN_TITLE_LEN, max: MAX_TITLE_LEN })
      .withMessage(
        `Value for 'title' must be between ${MIN_TITLE_LEN} and ${MAX_TITLE_LEN} characters long`,
      ),

    body('image')
      .trim()
      .isLength({ min: MIN_STR_LEN, max: MAX_STR_LEN })
      .withMessage(
        `Value for 'image' must be between ${MIN_STR_LEN} and ${MAX_STR_LEN} characters long`,
      )
      .isURL()
      .withMessage(`Value for 'image' must be a URL`),

    body('author')
      .not()
      .isEmpty()
      .withMessage("Value for 'author' is required")
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'author' must be of type string")
      .isLength({ min: MIN_AUTHOR_LEN, max: MAX_AUTHOR_LEN })
      .withMessage(
        `"Value for 'author' must be between ${MIN_AUTHOR_LEN} and ${MAX_AUTHOR_LEN} characters long`,
      ),

    body('description')
      .not()
      .isEmpty()
      .withMessage("Value for 'description' is required")
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'description' must be of type string")
      .isLength({ min: MIN_DESCRIPTION, max: MAX_DESCRIPTION })
      .withMessage(
        `Value for 'description' must be between ${MIN_DESCRIPTION} and ${MAX_DESCRIPTION} characters long`,
      ),
    addRecipe,
  )
  .put(
    '/:id',
    body('title')
      .not()
      .isEmpty()
      .withMessage("Value for 'title' is required")
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'title' must be of type string")
      .isLength({ min: MIN_TITLE_LEN, max: MAX_TITLE_LEN })
      .withMessage(
        `"Value for 'title' must be between ${MIN_TITLE_LEN} and ${MAX_TITLE_LEN} characters long`,
      ),

    body('image')
      .optional()
      .trim()
      .escape()
      .isLength({ min: MIN_STR_LEN, max: MAX_STR_LEN })
      .withMessage(
        `Value for 'image' must be between ${MIN_STR_LEN} and ${MAX_STR_LEN} characters long`,
      )
      .isURL()
      .withMessage(`Value for 'image' must be a URL`),

    body('author')
      .not()
      .isEmpty()
      .withMessage("Value for 'author' is required")
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'author' must be of type string")
      .isLength({ min: MIN_AUTHOR_LEN, max: MAX_AUTHOR_LEN })
      .withMessage(
        `"Value for 'author' must be between ${MIN_AUTHOR_LEN} and ${MAX_AUTHOR_LEN} characters long`,
      ),

    body('description')
      .not()
      .isEmpty()
      .withMessage("Value for 'description' is required")
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'description' must be of type string")
      .isLength({ min: MIN_DESCRIPTION, max: MAX_DESCRIPTION })
      .withMessage(
        `"Value for 'description' must be between ${MIN_DESCRIPTION} and ${MAX_DESCRIPTION} characters long`,
      ),
    updateRecipe,
  )

  .delete('/:id', removeRecipe);

module.exports = router;

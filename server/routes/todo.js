const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/*This router is mounted at http://localhost:300/todo/ */

// router.get('/', function(req, res, next) {
//   knex('todo')
//     .select()
//     .then(todos => {
//       res.render('all', { todos: todos });
//     });
// });

router.get('/', async (req, res) => {
  try {
    const todos = await knex('todo').select();
    res.render('all', { todos });
  } catch (error) {
    console.error(error);
  }
});

router.get('/new', (req, res) => {
    res.render('new');
});

module.exports = router;

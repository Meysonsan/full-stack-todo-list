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

function respondAndRenderTodo(id, res, viewName) {
  if(typeof id != 'undefined') {
    knex('todo')
      .select()
      .where('id', id)
      .first()
      .then(todo => {
        res.render(viewName, todo);
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'single');
}); 



router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'edit');
});

function validTodo(todo) {
  return typeof todo.title == 'string' &&
          todo.title.trim() != '' &&
          typeof todo.priority != 'undefined' &&
          !isNaN(todo.priority);
}

router.post('/', (req, res) => {
  if(validTodo(req.body)) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      date: new Date(),
    };
    // insert into the database
    knex('todo')
      .insert(todo, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/todo/${id}`);
      });
  } else {
    // respond with an error
    res.status(500);
    res.render('error', {
      message: 'Invalid todo'
    });
  }
});

// async function validateTodoRenderError(req, res) {
//   try {
//     if (validTodo(req.body)) {
//       const todo = {
//         title: req.body.title,
//         description: req.body.description,
//         priority: req.body.priority
//       };

//       return todo;

//     } else {
//       res.status(400).render('error', { message: 'Invalid todo' });
//       throw new Error('Invalid todo');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).render('error', { message: 'Internal server error' });
//   }
// }

// async function respondAndRenderTodo(id, res, viewName) {
//   try {
//     if (validId(id)) {
//       const todo = await knex('todo')
//         .select()
//         .where('id', id)
//         .first();

//       res.render(viewName, todo);
//     } else {
//       res.status(400).render('error', { message: 'Invalid id' });
//       throw new Error('Invalid id');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).render('error', { message: 'Internal server error' });
//   }
// }



module.exports = router;

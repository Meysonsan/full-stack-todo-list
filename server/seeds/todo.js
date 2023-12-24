/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// title - text
// priority - integer 1, 2, 3
// description - text
// done - boolean
// date - datetime

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  const todos = [{
    title: 'Build a CRUD App',
    priority: 1,
    date: new Date()
  }, {
    title: 'Do the dishes',
    priority: 3,
    date: new Date()
  }, {
    title: 'Render a view',
    priority: 2,
    date: new Date()
  }, {
    title: 'Walk the dog',
    priority: 5,
    date: new Date()
  }];
  await knex('todo').insert(todos);
};

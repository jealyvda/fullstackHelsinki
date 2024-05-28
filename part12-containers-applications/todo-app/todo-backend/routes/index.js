const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  // Get the current value of the counter from Redis
  const addedTodos = await redis.getAsync('added_todos');

  res.json({ added_todos: addedTodos || 0 });
})

module.exports = router;

const router = require('express').Router();
const cardController = require('../controllers/cardController');

// Add
router.post('/store', cardController.addCard);

// Get all cards
router.get('/', cardController.getAllCards);

// Get a card
router.get('/:id', cardController.getACard);

module.exports = router;
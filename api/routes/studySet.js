const router = require('express').Router();
const studySetController = require('../controllers/studySetController');

// Add
router.post('/store', studySetController.addStudySet);

// Get all study sets
router.get('/', studySetController.getAllStudySets);

// Get a study set
router.get('/:id', studySetController.getAStudySet);

// Update a study set
router.put('/:id', studySetController.UpdateStudySet);

module.exports = router;
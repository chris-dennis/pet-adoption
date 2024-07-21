const express = require('express');
const router = express.Router();
const { getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal } = require('../controllers/animals');
const auth = require('../middlewares/auth');

// Get all animals
router.get('/', getAnimals);

// Get animal by ID
router.get('/:id', getAnimalById);


// Private routes
router.post('/', auth, createAnimal);
router.put('/:id', auth, updateAnimal);
router.delete('/:id', auth, deleteAnimal);

module.exports = router;
const Animal = require('../models/Animal');

exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll();
        res.json(animals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);
        if (!animal) {
            return res.status(404).json({ msg: 'Animal not found' });
        }
        res.json(animal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createAnimal = async (req, res) => {
    const { name, species, breed, age, size, description, image_url } = req.body;
    try {
        const newAnimal = new Animal({ name, species, breed, age, size, description, image_url });
        await newAnimal.save();
        res.json(newAnimal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateAnimal = async (req, res) => {
    const { name, species, breed, age, size, description, image_url, status } = req.body;
    try {
        const animal = await Animal.findByPk(req.params.id);
        if (!animal) {
            return res.status(404).json({ msg: 'Animal not found' });
        }

        animal.name = name || animal.name;
        animal.species = species || animal.species;
        animal.breed = breed || animal.breed;
        animal.age = age || animal.age;
        animal.size = size || animal.size;
        animal.description = description || animal.description;
        animal.image_url = image_url || animal.image_url;
        animal.status = status || animal.status;

        await animal.save();
        res.json(animal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);
        if (!animal) {
            return res.status(404).json({ msg: 'Animal not found' });
        }

        await animal.destroy();
        res.json({ msg: 'Animal removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const { Sequelize } = require('sequelize');
const Animal = require('./models/Animal');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const seedAnimals = async () => {
    await sequelize.sync({ force: true }); // Warning: This will drop existing tables

    const animals = [
        // Dogs
        { name: 'Buddy', species: 'Dog', breed: 'Labrador', age: 2, size: 'Large', description: 'Friendly and playful, Buddy loves to fetch and swim in the lake.', image_url: '/uploads/dogs1.jpg', status: 'available' },
        { name: 'Max', species: 'Dog', breed: 'German Shepherd', age: 3, size: 'Large', description: 'Loyal and protective, Max is a great companion for outdoor adventures.', image_url: '/uploads/dogs2.jpg', status: 'available' },
        { name: 'Bella', species: 'Dog', breed: 'Golden Retriever', age: 1, size: 'Large', description: 'Gentle and affectionate, Bella enjoys long walks and belly rubs.', image_url: '/uploads/dogs3.jpg', status: 'available' },
        { name: 'Charlie', species: 'Dog', breed: 'Beagle', age: 2, size: 'Medium', description: 'Curious and energetic, Charlie loves to explore and sniff around.', image_url: '/uploads/dogs4.jpg', status: 'adopted' },
        { name: 'Lucy', species: 'Dog', breed: 'Bulldog', age: 4, size: 'Medium', description: 'Calm and lovable, Lucy is a couch potato who enjoys cuddles.', image_url: '/uploads/dogs5.jpg', status: 'available' },
        { name: 'Rocky', species: 'Dog', breed: 'Boxer', age: 2, size: 'Large', description: 'Playful and strong, Rocky enjoys running and playing with toys.', image_url: '/uploads/dogs6.jpg', status: 'adopted' },
        { name: 'Molly', species: 'Dog', breed: 'Poodle', age: 1, size: 'Small', description: 'Smart and elegant, Molly loves to learn new tricks and show off.', image_url: '/uploads/dogs7.jpg', status: 'available' },
        { name: 'Daisy', species: 'Dog', breed: 'Dachshund', age: 3, size: 'Small', description: 'Sweet and brave, Daisy loves to burrow under blankets and snuggle.', image_url: '/uploads/dogs8.jpg', status: 'available' },
        { name: 'Jack', species: 'Dog', breed: 'Rottweiler', age: 4, size: 'Large', description: 'Strong and confident, Jack enjoys guarding and playing fetch.', image_url: '/uploads/dogs9.jpg', status: 'available' },
        { name: 'Luna', species: 'Dog', breed: 'Husky', age: 2, size: 'Large', description: 'Adventurous and vocal, Luna loves to howl and play in the snow.', image_url: '/uploads/dogs10.jpg', status: 'adopted' },
        { name: 'Teddy', species: 'Dog', breed: 'Cocker Spaniel', age: 3, size: 'Medium', description: 'Friendly and happy, Teddy loves to wag his tail and greet everyone.', image_url: '/uploads/dogs11.jpg', status: 'available' },
        { name: 'Buster', species: 'Dog', breed: 'Pit Bull', age: 2, size: 'Large', description: 'Affectionate and strong, Buster enjoys playing tug-of-war and cuddling.', image_url: '/uploads/dogs12.jpg', status: 'available' },
        { name: 'Sadie', species: 'Dog', breed: 'Chihuahua', age: 1, size: 'Small', description: 'Tiny and bold, Sadie loves to bark and show her big personality.', image_url: '/uploads/dogs13.jpg', status: 'available' },
        { name: 'Roxy', species: 'Dog', breed: 'Border Collie', age: 3, size: 'Medium', description: 'Smart and energetic, Roxy loves to herd and play with frisbees.', image_url: '/uploads/dogs14.jpg', status: 'available' },

        // Cats
        { name: 'Mittens', species: 'Cat', breed: 'Siamese', age: 1, size: 'Medium', description: 'Quiet and affectionate, Mittens enjoys lounging in sunny spots.', image_url: '/uploads/cats1.jpg', status: 'adopted' },
        { name: 'Goldie', species: 'Cat', breed: 'Domestic Shorthair', age: 1, size: 'Small', description: 'Calm and beautiful, Goldie loves to curl up and purr.', image_url: '/uploads/cats2.jpg', status: 'available' },
        { name: 'Whiskers', species: 'Cat', breed: 'Maine Coon', age: 2, size: 'Large', description: 'Majestic and gentle, Whiskers enjoys being brushed and pampered.', image_url: '/uploads/cats3.jpg', status: 'available' },
        { name: 'Shadow', species: 'Cat', breed: 'Black Cat', age: 3, size: 'Medium', description: 'Mysterious and sleek, Shadow loves to play hide and seek.', image_url: '/uploads/cats4.jpg', status: 'available' },
        { name: 'Lily', species: 'Cat', breed: 'Persian', age: 1, size: 'Small', description: 'Fluffy and serene, Lily enjoys being petted and lounging elegantly.', image_url: '/uploads/cats5.jpg', status: 'available' },
        { name: 'Oliver', species: 'Cat', breed: 'Tabby', age: 2, size: 'Medium', description: 'Curious and playful, Oliver loves to chase toys and climb.', image_url: '/uploads/cats6.jpg', status: 'available' },
        { name: 'Coco', species: 'Cat', breed: 'Ragdoll', age: 1, size: 'Medium', description: 'Laid-back and loving, Coco enjoys being held and cuddled.', image_url: '/uploads/cats7.jpg', status: 'adopted' },
        { name: 'Nala', species: 'Cat', breed: 'Bengal', age: 2, size: 'Medium', description: 'Active and agile, Nala loves to leap and explore high places.', image_url: '/uploads/cats8.jpg', status: 'available' },
        { name: 'Simba', species: 'Cat', breed: 'Abyssinian', age: 3, size: 'Medium', description: 'Regal and alert, Simba enjoys watching everything around him.', image_url: '/uploads/cats9.jpg', status: 'available' },
        { name: 'Chloe', species: 'Cat', breed: 'Russian Blue', age: 1, size: 'Small', description: 'Quiet and gentle, Chloe loves to sit on laps and purr softly.', image_url: '/uploads/cats10.jpg', status: 'available' },
    ];

    await Animal.bulkCreate(animals);
    console.log('Animals have been added');
    process.exit();
};

seedAnimals();
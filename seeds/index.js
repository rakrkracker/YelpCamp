const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected');
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fb8f7f6528e4ea44ed44df7',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum magnam eveniet porro dolorem, dolorum aliquid beatae dignissimos explicabo asperiores ut autem error quos dolores dicta facilis sed sunt ipsam ducimus?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/db6vrbjgz/image/upload/v1606122779/YelpCamp/hk6vynbgzkuosoefhntb.jpg',
                    filename: 'YelpCamp/hk6vynbgzkuosoefhntb'
                },
                {
                    url: 'https://res.cloudinary.com/db6vrbjgz/image/upload/v1606122780/YelpCamp/hvzzsnfchvbygloxo86t.jpg',
                    filename: 'YelpCamp/hvzzsnfchvbygloxo86t'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => mongoose.connection.close());
const colors = require('colors');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

//***Connect Mongoose with Mongodb*** 
mongoose
    .connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Open'.brightCyan);
    })
    .catch((err) => {
        console.log('Error'.red);
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randoM = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[randoM].city}, ${cities[randoM].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'http://source.unsplash.com/collection/484351',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sit vel veniam aperiam, doloremque, repellat quibusdam porro harum dicta ab quos odio praesentium. Molestias asperiores eum debitis beatae perferendis sunt?',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
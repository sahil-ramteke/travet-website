const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const dummyPackages = [
  {
    title: 'Paris Getaway',
    description: 'Experience the romance of Paris with Eiffel Tower visits and Seine river cruise.',
    destination: 'Paris, France',
    price: 899,
    duration: '5 days',
    maxGuests: 4,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3b9172c0b4b0?w=400',
    featured: true
  },
  {
    title: 'Bali Adventure',
    description: 'Explore temples, rice terraces, and pristine beaches in Bali.',
    destination: 'Bali, Indonesia',
    price: 649,
    duration: '7 days',
    maxGuests: 6,
    imageUrl: 'https://images.unsplash.com/photo-1537996192473-7f3a7e4a7b3d?w=400',
    featured: true
  },
  {
    title: 'New York City Tour',
    description: 'See the Statue of Liberty, Times Square, and Central Park.',
    destination: 'New York, USA',
    price: 1199,
    duration: '4 days',
    maxGuests: 5,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e4a6b5e?w=400',
    featured: false
  },
  {
    title: 'Tokyo Explorer',
    description: 'Discover the blend of tradition and technology in Tokyo.',
    destination: 'Tokyo, Japan',
    price: 1399,
    duration: '6 days',
    maxGuests: 4,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400',
    featured: false
  }
];

const importData = async () => {
  try {
    await Package.deleteMany();
    await Package.insertMany(dummyPackages);
    console.log('Dummy packages imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
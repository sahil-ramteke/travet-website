const Booking = require('../models/Booking');
const Package = require('../models/Package');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { packageId, guests } = req.body;

  try {
    // Find the package to calculate total price
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Calculate total price
    const totalPrice = pkg.price * guests;

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      package: packageId,
      guests,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('package');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBooking, getMyBookings };
const Package = require('../models/Package');
const Booking = require('../models/Booking');

// @desc    Create a package
// @route   POST /api/admin/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a package
// @route   PUT /api/admin/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a package
// @route   DELETE /api/admin/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    await pkg.deleteOne(); // or pkg.remove() depending on Mongoose version
    res.json({ message: 'Package removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all bookings (optional admin feature)
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user').populate('package');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPackage, updatePackage, deletePackage, getAllBookings };
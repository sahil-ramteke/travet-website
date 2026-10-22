const Package = require('../models/Package');

// @desc    Fetch all packages
// @route   GET /api/packages
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({});
    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single package by ID
// @route   GET /api/packages/:id
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (pkg) {
      res.json(pkg);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPackages, getPackageById };

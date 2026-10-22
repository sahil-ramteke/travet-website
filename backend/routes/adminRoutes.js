const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createPackage,
  updatePackage,
  deletePackage,
  getAllBookings
} = require('../controllers/adminController');

const router = express.Router();

router.route('/packages')
  .post(protect, admin, createPackage);

router.route('/packages/:id')
  .put(protect, admin, updatePackage)
  .delete(protect, admin, deletePackage);

router.get('/bookings', protect, admin, getAllBookings);

module.exports = router;
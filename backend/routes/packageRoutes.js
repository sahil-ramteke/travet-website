const express = require('express');
const { getPackages, getPackageById } = require('../controllers/packageController');

const router = express.Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);

module.exports = router;
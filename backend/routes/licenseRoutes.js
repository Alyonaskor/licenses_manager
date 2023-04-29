const express = require('express');
const router = express.Router();
const { createLicense, updateLicense, deleteLicense, getLicense, getAllLicense} = require('../controllers/licenseController');
const { protect } = require('../middleware/authMiddleware');


router.post(`/create`,protect, createLicense);
router.post(`/update`, protect,updateLicense);
// router.post(`/delete`, protect, deleteLicense);
// router.post(`/get`, protect, getLicense);
// router.post(`/getAll`, protect, getAllLicense);


module.exports = router;
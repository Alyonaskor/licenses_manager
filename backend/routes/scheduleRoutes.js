const express = require('express');
const router = express.Router();
const { createSchedule, getSchedule } = require('../controllers/scheduleController')


router.post(`/create`, createSchedule)
router.post(`/get`, getSchedule)


module.exports = router;
const express = require('express');
const router = express.Router();
const { createTeacher, updateTeacher, deleteTeacher, getTeacher, getAllTeachers} = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');


router.post(`/create`,protect, createTeacher);
router.post(`/update`, protect,updateTeacher);
router.post(`/delete`, protect, deleteTeacher);
router.post(`/get`, protect, getTeacher);
router.post(`/getAll`, protect, getAllTeachers);


module.exports = router;
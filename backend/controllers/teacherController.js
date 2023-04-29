//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require('express-async-handler');
const Teacher = require('../models/teacherModel');
const { json } = require('express');


//@desc     Create a new teacher
//@route    /api/teacher/create
//@access   Private
const createTeacher = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //Validation
    if (!name) {
        res.status(400)
        throw new Error('Please add teacher name');

    }
    //Check that teacher is already exists
    const teacherExists = await Teacher.findOne({ name });
    if (teacherExists) {
        res.status(400);
        throw new Error(`Teacher is already exists`)
    }

   
    //Create teacher
    const teacher = await Teacher.create({
        name,
    })

    if (teacher) {
        res.status(201).json({
            _id: teacher._id,
            name: teacher.name,
        })
    } else {
        res.status(400);
        throw new Error(`Invalid teacher data`);
    }
})

//@desc     Update teacher
//@route    /api/teacher/update
//@access   Private
const updateTeacher = asyncHandler(async (req, res) => {
    const { name,newName } = req.body;

 //Validation
 if (!name || !newName) {
    res.status(400)
    throw new Error('Please add all fields');

}
//Check that teacher is already exists and update it
const filter = {name};
const update = {name: newName};
const teacherExists = await Teacher.findOneAndUpdate(filter, update );


if (teacherExists) {
    res.status(201).json(`Teacher ${name} has been updated successfully`);
}
    else {
        res.status(400);
    throw new Error(`Invalid teacher data`)
}
   
});

//@desc     Delete current teacher
//@route    /api/teacher/delete
//@access   Private

const deleteTeacher = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //Validation
    if (!name) {
        res.status(400)
        throw new Error('Please add teacher name');

    }
    //Check that teacher is  exists and delete it
    const teacherExists = await Teacher.findOneAndDelete({ name });
    if (teacherExists) {
        res.status(201).json(`Teacher ${name} has been deleted successfully`);
    }
        else {
            res.status(400);
        throw new Error(`Invalid teacher data`)
    }
});
//@desc     Get teacher 
//@route    /api/teacher/
//@access   Private

const getTeacher = asyncHandler(async (req, res) => {
    const { name } = req.body;
    //Check that teacher is  exists and delete it
    const teacherExists = await Teacher.findOne({ name });
    if (teacherExists) {
        res.status(201).json(name);
    }
        else {
            res.status(200);
        throw new Error(`Teacher doesn't exist`)
        }
});

const getAllTeachers = asyncHandler(async (req, res) => {
    
    //Check that teacher is  exists and delete it
    const teachers= await Teacher.find();
    if (teachers) {
        res.status(201).json(teachers);
    }
        else {
            res.status(200);
        throw new Error(`Teachers doesn't exist`)
        }
});


module.exports = {
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacher,
    getAllTeachers,
} 
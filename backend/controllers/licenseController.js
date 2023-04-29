//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require('express-async-handler');
const License = require('../models/licenseModel');
const { json } = require('express');


//@desc     Create a new teacher
//@route    /api/teacher/create
//@access   Private
const createLicense = asyncHandler(async (req, res) => {
    const { account } = req.body;

    //Validation
    if (!account) {
        res.status(400)
        throw new Error('Please add license account');

    }
    //Check that teacher is already exists
    const licenseExists = await License.findOne({ account});
    if (licenseExists) {
        res.status(400);
        throw new Error(`License is already exists`)
    }

   
    //Create teacher
    const license = await License.create({
        account,
        status: 'Active',
    })

    if (license) {
        res.status(201).json({
            _id: license._id,
            name: license.account,
            status: license.status,
        })
    } else {
        res.status(400);
        throw new Error(`Invalid license data`);
    }
})

//@desc     Update teacher
//@route    /api/teacher/update
//@access   Private
const updateLicense = asyncHandler(async (req, res) => {
    const { account, newAccount, newStatus  } = req.body;
//Validation
 if (!account) {
    res.status(400)
    throw new Error('Please add all fields');
 }  
     License.findOneAndUpdate({account}, { "$set": { account: newAccount, status: newStatus }}).exec(function(err, license){
        if(err) {
            
            res.status(500).send(err);
        } else {
                 res.status(200).send(license);
        }
     });

}
);

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
    createLicense,
    updateLicense,
    // deleteTeacher,
    // getTeacher,
    // getAllTeachers,
} 
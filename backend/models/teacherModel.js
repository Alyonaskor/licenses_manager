const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please add a name`],
        unique: true,
    },
    employeeImage: {
        type: String,
        required: [false, `Please add a photo`]
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Teacher', teacherSchema);
const mongoose = require('mongoose');

const licenseSchema = mongoose.Schema({
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [false],
        ref: 'Teacher'
    }],
    account: {
        type: String,
        required: [true, `Please add an account`]
    },
    status: {
        type: String,
        required: [true, `Please choose a status`],
        enum: ['Active', 'Inactive']
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('License', licenseSchema);
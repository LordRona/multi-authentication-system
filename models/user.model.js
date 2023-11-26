const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        maxlength: 50
    },
    address: {
        type: String,
        required: [true, "Please provide address"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    token: [{
        token: {
            type: String,
            required: false
        }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
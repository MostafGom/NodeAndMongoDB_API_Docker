"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    lastname: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 60
    },
    password: {
        type: String,
        required: true,
        max: 1024
        // min: 6,
        // max: 20
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    }
});
const User = mongoose.model('User', UserSchema);
exports.default = User;

// src/services/userService.js

const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    async registerUser(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        return user;
    }

    async authenticateUser(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }

    async getUserProfile(userId) {
        return await User.findById(userId);
    }
}

module.exports = new UserService();

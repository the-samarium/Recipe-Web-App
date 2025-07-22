const { User } = require("../model/model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const fs = require('fs');




maxAge = 2 * 24 * 60 * 60;
//jwt creating function
const createToken = (id) => {
    return jwt.sign({ id }, "secretkey", {
        expiresIn: maxAge // This token will be valid for two days after creation
    });
};

const signup_get = (req, res) => {
    res.render('signup')
}

const login_get = (req, res) => {
    res.render('login', { error: null });
}

const signup_post = async (req, res) => {
    const body = req.body;
    console.log("Signup POST body:", body);
    try {
        let avatarPath = '/public/default-avatar.png';
        if (req.file) {
            avatarPath = '/uploads/' + req.file.filename;
        }
        const newUser = await User.create({
            name: body.name,
            email: body.email,
            password: body.password,
            avatar: avatarPath
        });
        const token = createToken(newUser._id);
        res.cookie('jwt', token, {
            maxAge: maxAge * 1000,
            httpOnly: true 
        });
        console.log("Redirecting to /home");
        return res.redirect('/home');
    } catch (err) {
        console.error("Signup error:", err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).render('signup', { error: "Email already exists. Please try logging in or use another email." });
        }
        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            // Get the first error message
            const errorMsg = Object.values(err.errors)[0].message;
            return res.status(400).render('signup', { error: errorMsg });
        }
        // Always send a response for any other error
        return res.status(500).render('signup', { error: "An error occurred during signup. Please try again." });
    }
};



const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // If a new profile picture is uploaded, update avatar and delete old one
                if (req.file) {
                    if (user.avatar && user.avatar !== '/public/default-avatar.png') {
                        const oldPath = __dirname + '/../' + user.avatar;
                        if (fs.existsSync(oldPath)) {
                            fs.unlinkSync(oldPath);
                        }
                    }
                    user.avatar = '/uploads/' + req.file.filename;
                    await user.save();
                }
                const token = createToken(user._id);
                res.cookie('jwt', token, {
                    maxAge: maxAge * 1000, 
                    httpOnly: true
                });
                return res.redirect('/home');
            } else {
                return res.render('login', { error: 'Invalid email or password.' });
            }
        } else {
            return res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('Server error');
    }
}

const logout = async (req, res) => {
    try {
        if (res.locals.user && res.locals.user.avatar && res.locals.user.avatar !== '/public/default-avatar.png') {
            const filePath = __dirname + '/../' + res.locals.user.avatar;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    } catch (e) {
        console.log('Error deleting avatar:', e);
    }
    res.clearCookie('jwt');
    res.redirect('/');
}


module.exports = {
    login_get, login_post, signup_get, signup_post, logout
}
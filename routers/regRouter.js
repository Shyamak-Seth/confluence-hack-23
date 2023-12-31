require('dotenv').config()
const router = require('express').Router()
const User = require('../schemas/userSchema.js')
const bcrypt = require('bcrypt')
const sendMail = require('../utils/mailHelper.js')
const nodemailer = require('nodemailer');
const ejs = require('ejs')


router.get('/', (req, res) => {
    res.render('register', {error: ""})
})

router.post('/', async (req, res) => {
    const {username, fname, lname, password, cnfpassword} = req.body
    const foundUser = await User.findOne({username})
    if (!username || !password || !fname || !lname || !cnfpassword) {
        return res.render('register', {error: 'Please enter all the credentials'})
    }
    if (password !== cnfpassword) {
        return res.render('register', {error: 'The passwords do not match!'})
    }
    if (foundUser) return res.render('register', {error: "A user already exists with this username."})
    // var mailOptions = {
    //     from: "confluence23.aisg46@outlook.com",
    //     to: username,
    //     subject: "Registration Verification",
    //     text: 'Registration Verification',
    //     html: ejs.renderFile(__dirname + "/../views/verify.ejs", {
    //         fname: fname,
    //         lname: lname,
    //         username: username,
    //         site: process.env.DOMAIN_NAME
    //     })
    // };
    // try {
    //     await transporter.sendMail(mailOptions);
    // } catch (err) {
    //     return res.render('register', {error: "Please enter a correct email."})
    // }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username: username,
        fname: fname,
        lname: lname,
        password: hashedPassword
    })
    await newUser.save()
    console.log(`ACCOUNT CREATED`)
    res.redirect('/login')
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router
const router = require('express').Router()
const User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    res.render('breachProtocol')
})

router.post('/', async (req, res) => {
    const {success} = req.body
    if (success) {
        const foundUser = await User.findOne({username: req.user.username})
        await User.updateOne({username: req.user.username}, {
            $set: {
                coins: 20 + foundUser.coins
            }
        })
        console.log(await User.findOne({username: req.user.username}))
    }
})

module.exports = router
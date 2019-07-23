const router = require('express').Router();

const Users = require('./userDb');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.ststus(500).json({message: " could not get users" })
        })
})

module.exports = router;
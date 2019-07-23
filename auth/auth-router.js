const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/userDb');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12); // 2 ^ n
    user.password = hash;
    // let user = req.body;
    // user.password = bcrypt.hashSync(user.password, 12)
    
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router;
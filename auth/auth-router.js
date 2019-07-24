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

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                res.status(200).json(`logged in!`)
            } else {
                res.status(400).json({ message: 'could not find user' })
            }
        })
        .catch(error => {
            res.status(500).json({message: "could not log in" })
        })
})

module.exports = router;
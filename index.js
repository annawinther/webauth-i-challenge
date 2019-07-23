const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const usersRouter = require('./users/users-router');


// const cookieParser = require('cookie-parser');
const session = require('express-session');

const Users = require('./users/userDb')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);


server.use(session({
    name: 'sessionId',
    secret: 'keep it secret, keep it short',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,

}))

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
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

server.post('/api/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(user => {
            if(user && bcrypt.compareSync(password, user[0].password)){
                req.session.user = user;
                res.status(200).json(`welcome ${username}!`)
            } else {
                res.status(400).json('could not find user')
            }
        })
        .catch(error => {
            res.status(500).json({message: "could not log in" })
        })
})

const port = process.env.PORT || 3003;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

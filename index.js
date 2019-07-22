const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const Users = require('./users/userDb')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 12)
    
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

const port = process.env.PORT || 3003;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

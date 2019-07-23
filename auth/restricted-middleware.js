module.exports = (req, res, next) => {
    if( req.session && req.session.user) {
    // for this to succeed
    // 1- request from postman contains a "Cookie" with session id
    // 2- there actually exists a session in the sessions array
    //        with an id that matches the one in the cookie
    // 3- the cookie hasn't expired
    next()
    } else {
        res.status(400).json({ message: 'please log in to see users!' })
    }
}
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authToken = req.headers['authorization']?.split(' ')[1];
    const token = req?.cookies?.token || authToken // Extract token from cookies
    if (!token) {
        return res.status(401).send({ message: 'Access Denied: No Token Provided!' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

module.exports = {
    authenticateToken
}
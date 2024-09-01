const { getUser, createUser } = require('../services/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUser({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists'});
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
    // Create the user
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    let token
    if(newUser){
        token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    }
    // Send a success response
    res.cookie('token',token).status(201).send({ message: 'User created successfully', user: newUser });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUser({ email });
        if (!user) {
            return res.status(401).send({ message: 'Either Email or password is wrong!!' });
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Either Email or password is wrong!!' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
        res.cookie('token', token).status(200).send({ message: 'User logged in successfully'});
    } catch (e) {
        res.status(400).send({ message: 'Something went wrong' });
    }
}

module.exports = { signUp,signIn };

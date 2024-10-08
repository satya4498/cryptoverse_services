const { getUser, createUser } = require('../services/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { name, email, password,phone } = req.body;

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
      phone
    });

    let token
    if(newUser){
        token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    }
    // Send a success response
    res.cookie('token',token).status(201).send({ message: 'User created successfully', user: newUser, token: token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.query;
        console.log('entered in signin',req.query);
        const user = await getUser({ email });
        console.log(user);
        
        if (!user) {
            return res.status(401).send({ message: 'Either Email or password is wrong!!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log({isMatch});
        if (!isMatch) {
            return res.status(401).send({ message: 'Either Email or password is wrong!!' });
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
        
       return res.cookie('token', token,
            {httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            path: '/'
        }).status(200).send({ message: 'User logged in successfully',token});
    } catch (e) {
      return  res.status(400).send({ message: 'Something went wrong' });
    }
}

module.exports = { signUp,signIn };

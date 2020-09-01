const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  // validate data
  const {error} = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const emailExist = await User.findOne({email: req.body.email});
  if  (emailExist) return res.status(400).send('Emails already exists');

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send({id: savedUser.id, message: 'New user registered'});
  } catch(err) {
    res.status(400).send(err);
  }
});


router.post('/login', async (req, res) => {
  // validate data
  const {error} = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const userData = await User.findOne({email: req.body.email});
  if (!userData) return res.status(400).send('Email or password is wrong');

  // check password
  const validPass = await bcrypt.compare(req.body.password, userData.password)
  if (!validPass) return res.status(400).send('Email or password is wrong1');

  // create token
  const token = await jwt.sign({_id: userData.id}, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
})


module.exports = router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const { ApiError } = require('../middleware/ApiError');

const users = [];

const findUser = (id, name) => 
  users.find(user => user.id === id && user.username === name);
const findUserByName = (name) => 
  users.find(user => user.username === name);

const signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (users.some(user => user.username === username)) {
      return next(new ApiError(400, 'User name is already used'));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  users.push({ id: users.length + 1, username, email, password: hashedPassword });

  return res.status(201).json({ message: 'Registration successful' });
};

const signin = (req, res, next) => {

  const { username, password } = req.body;

  const user = findUserByName(username);
  console.log(user);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    const error = new ApiError(400, 'Invalid username or password')
      return next (error);
  }

  const accessToken = jwt.sign(
    { id: user.id, name: user.username }, config.env.JWT_SECRET, { expiresIn: config.env.tokenExpiration });

  const refreshToken = jwt.sign(
    { id: user.id, name: user.username }, config.env.JWT_REFRESH_SECRET);

  user.refreshToken = refreshToken;

  return res.status(200).json({ accessToken, refreshToken, message: 'Authentication successful' });
};

const refreshToken = (req, res, next) => {
  const { userid, username } = req.body;
  let refreshToken = req.headers["authorization"];

  if (refreshToken)
    refreshToken = refreshToken.trim().substring("Bearer ".length).trim();
  
  if (!refreshToken) {
      const error = new ApiError(401, 'Refresh token is required')
      return next (error);
  }

  const user = findUser(userid, username);

  if (!user) {
      const error = new ApiError(400, "Request format problem.")
      return next (error);
  }

  if (user.refreshToken !== refreshToken) {
      const error = new ApiError(401, "RequestToken format problem.")
      return next (error);
  }

  try {
    const { id, name } = jwt.verify(refreshToken, config.env.JWT_REFRESH_SECRET);

    console.log(name);

    if (username !== name || userid !== id) {
      throw new ApiError(400, "Token format problem.");
    }

    const accessToken = jwt.sign(
      { id: user.id, name: user.username }, config.env.JWT_SECRET, { expiresIn: config.env.tokenExpiration });

    console.log(accessToken);

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, error.message));
    }
    return next(error);
  }
};

const getMe = (req, res, next) => {
  res.send('authentification successful!');
}

module.exports = {
  signup,
  signin,
  refreshToken,
  getMe,
  findUser
};

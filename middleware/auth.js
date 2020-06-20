const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'You are not authorized to access this route',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id);
    } catch (err) {
      if (err.expiredAt) {
        console.log(err.expiredAt);
        return res.status(401).json({
          success: false,
          error: 'Token expired',
        });
      }
      return res.status(401).json({
        success: false,
        error: 'You are not authorized to access this route',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        error: 'You are not authorized to access this route',
      });
    }
    next();
  };
};

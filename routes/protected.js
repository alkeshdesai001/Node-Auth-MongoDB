const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

router.get('/protected', protect, (req, res) =>
  res.status(200).json({ success: true, msg: 'Access Protected Route' })
);

router.get('/admin', protect, authorize('admin'), (req, res) =>
  res
    .status(200)
    .json({ success: true, msg: `User role ${req.user.role} is Authorized` })
);

router.get('/publisher', protect, authorize('admin', 'publisher'), (req, res) =>
  res
    .status(200)
    .json({ success: true, msg: `User role ${req.user.role} is Authorized` })
);

router.get('/user', protect, authorize('admin', 'user'), (req, res) =>
  res
    .status(200)
    .json({ success: true, msg: `User role ${req.user.role} is Authorized` })
);

module.exports = router;

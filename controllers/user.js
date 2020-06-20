const User = require('../models/User');

exports.signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email }).select('password');

    if (user) {
      return res.status(400).json({
        success: false,
        error: 'User already exist, try login instead',
      });
    }

    user = new User({ name, email, password, role });
    await user.save();

    let token = await user.signToken();

    res.status(200).json({
      success: true,
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid Credential' });
    }

    let isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid Credential' });
    }

    let token = await user.signToken();

    res.status(200).json({
      success: true,
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

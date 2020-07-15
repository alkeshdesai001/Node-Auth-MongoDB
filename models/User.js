import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.validatePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword.toString(), this.password);
};

userSchema.methods.signToken = async function (userPassword) {
  let payload = {
    user: {
      id: this.id,
      name: this.name,
    },
  };

  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1m',
  });
};

export default mongoose.model('User', userSchema);

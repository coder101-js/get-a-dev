// /controllers/userController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export async function signup(data) {
  const { name, email, password } = data;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(
        JSON.stringify({ message: 'Email already registered' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    return new Response(
      JSON.stringify({ message: 'Signup successful' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Signup error:', err);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function login(data) {
  const { email, password } = data;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(
        JSON.stringify({ message: 'Incorrect password' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return new Response(
      JSON.stringify({ token, user }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Login error:', err);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function oauthRegister(data) {
  const { name, email, image, provider } = data;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, image, provider });
      await user.save();
    }
    return new Response(
      JSON.stringify({ message: 'OAuth success', user }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('OAuth error:', err);
    return new Response(
      JSON.stringify({ message: 'OAuth registration failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

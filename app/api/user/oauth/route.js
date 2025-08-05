import { NextResponse } from 'next/server';
import User from '@/app/models/user';
import connectToDatabase from '@/app/lib/mongodb';

export async function POST(req) {
  await connectToDatabase(); // connect to MongoDB

  try {
    const body = await req.json();
    const { name, email, image, provider } = body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, image, provider });
      await user.save();
    }

    return NextResponse.json({ message: 'OAuth success', user }, { status: 200 });
  } catch (err) {
    console.error('OAuth error:', err);
    return NextResponse.json({ message: 'OAuth registration failed' }, { status: 500 });
  }
}

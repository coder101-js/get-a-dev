import connectToDatabase from '@/app/lib/mongodb';
import { botProtection } from '@/app/lib/botProtection';
import { createProfile,getProfiles } from '@/app/controllers/profileController';

export async function GET(req) {
  await connectToDatabase();
  const block = await botProtection(req);
  if (block) return block;

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  return getProfiles({ email });
}

export async function POST(req) {
  await connectToDatabase();
  const block = await botProtection(req);
  if (block) return block;

  const data = await req.json();
  return createProfile(data);
}

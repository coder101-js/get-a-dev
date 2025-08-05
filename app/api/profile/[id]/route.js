import connectToDatabase from '@/app/lib/mongodb';
import { botProtection } from '@/app/lib/botProtection';
import { deleteProfile } from '@/app/controllers/profileController';

export async function DELETE(req) {
  await connectToDatabase();
  const block = await botProtection(req);
  if (block) return block;

  // extract ID from URL
  const segments = req.nextUrl.pathname.split('/');
  const id = segments.pop();
  return deleteProfile(id);
}

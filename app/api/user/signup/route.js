import connectToDatabase from '@/app/lib/mongodb';
import { botProtection } from '@/app/lib/botProtection';
import { signup } from '@/app/controllers/userController';


export async function POST(req) {
  // 1. db & bot guard
  await connectToDatabase();
  const denied = await botProtection(req);
  if (denied) return denied;

  // 2. parse & call controller
  const body = await req.json();
  return signup(body);
}

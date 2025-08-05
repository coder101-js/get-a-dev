
import connectToDatabase from '@/app/lib/mongodb';
import { botProtection } from '@/app/lib/botProtection';
import { addReview,getReviews } from '@/app/controllers/reviewsController';

export async function GET(req) {
  await connectToDatabase();
  if (await botProtection(req)) return;
  return getReviews();
}

export async function POST(req) {
  await connectToDatabase();
  if (await botProtection(req)) return;
  const body = await req.json();
  return addReview(body);
}

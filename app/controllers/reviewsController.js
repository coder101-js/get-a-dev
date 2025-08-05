// /controllers/reviewsController.js
import Reviews from '../models/reviews';

export async function addReview(data) {
  const { Name, Review } = data;
  if (!Name || !Review) {
    return new Response(
      JSON.stringify({ message: 'All fields are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const newReview = new Reviews({ Name, Review });
    await newReview.save();
    return new Response(
      JSON.stringify({ message: '✅ Review sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error saving review:', err);
    return new Response(
      JSON.stringify({ message: '❌ Server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function getReviews() {
  try {
    const all = await Reviews.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(all), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return new Response(
      JSON.stringify({ message: '❌ Failed to fetch reviews.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

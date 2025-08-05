
import mongoose from 'mongoose';

const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error('Missing MONGO_URI');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((m) => {
        console.log('✅ MongoDB connected');
        return m;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
  console.warn('MONGODB_URI not found. Database features will be disabled.');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  // If no URI, return null (graceful degradation)
  if (!MONGODB_URI) {
    console.log('No MongoDB URI provided. Running without database.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.error('Failed to connect to MongoDB:', e);
  }

  return cached.conn;
}

export function isDBConnected(): boolean {
  return cached.conn !== null && mongoose.connection.readyState === 1;
}

import { MongoClient, Db, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
if (!MONGODB_DB_NAME) {
  throw new Error('Please define the MONGODB_DB_NAME environment variable inside .env');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI!, {
    // Specify TLS version 1.2
    tls: true,
  });
  await client.connect();
  const db = client.db(MONGODB_DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function findUserById(userId: string | ObjectId) {
  try {
    const { db } = await connectToDatabase();
    const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
    const user = await db.collection('users').findOne({ _id: objectId });
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
}

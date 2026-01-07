import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Cache the client promise to avoid multiple connections in development
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the client is not recreated on hot reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  clientPromise = client.connect();
}

// Export the client promise
export default clientPromise;

// Helper function to get the database
export async function getDatabase(dbName: string = 'cinema-platform'): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
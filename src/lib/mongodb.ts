import { MongoClient, Db } from "mongodb";

const DB_NAME = "ummedhaveli";

// Cache the connection PROMISE on globalThis. This survives Next.js dev
// hot-reloads and serverless module re-evaluation (so we reuse one pool instead
// of leaking a client per reload), and caching the in-flight promise (not just
// the resolved client) means concurrent first-callers share a single connect().
const globalForMongo = globalThis as unknown as {
  _mongoConn?: Promise<{ client: MongoClient; db: Db }>;
};

export function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (globalForMongo._mongoConn) {
    return globalForMongo._mongoConn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  const client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  globalForMongo._mongoConn = client
    .connect()
    .then((connected) => ({ client: connected, db: connected.db(DB_NAME) }))
    .catch((err) => {
      // Don't cache a failed connection — allow the next call to retry.
      globalForMongo._mongoConn = undefined;
      throw err;
    });

  return globalForMongo._mongoConn;
}

// Collection helpers
export async function getCollection(name: string) {
  const { db } = await connectToDatabase();
  return db.collection(name);
}

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'personal_site';
const collectionName = process.env.MONGODB_COLLECTION || 'rankings';
const documentId = 'global';

let cachedClient = null;

async function getCollection() {
  if (!uri) {
    throw new Error('MONGODB_URI is not set.');
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient.db(dbName).collection(collectionName);
}

export default async function handler(req, res) {
  try {
    const collection = await getCollection();

    if (req.method === 'GET') {
      const doc = await collection.findOne({ _id: documentId });
      return res.status(200).json({ data: doc?.data || null });
    }

    if (req.method === 'PUT') {
      const payload = req.body;
      const nextData = payload?.data;

      if (!nextData || typeof nextData !== 'object') {
        return res.status(400).json({ error: 'Invalid rankings payload.' });
      }

      await collection.updateOne(
        { _id: documentId },
        {
          $set: {
            data: nextData,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Rankings API error:', error);
    return res.status(500).json({ error: 'Failed to process rankings request.' });
  }
}

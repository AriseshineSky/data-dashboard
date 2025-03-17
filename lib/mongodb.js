import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb://mongouser:XSzY1nHbxi@34.172.204.102:27017')

export async function getDb() {
	if (!client.isConnected()) await client.connect();
	return client.db('product_meta_data');
}

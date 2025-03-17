import client from '../../lib/elasticsearch';
import {getDb} from '../../lib/mongodb';

export async function GET(req) {
	try {
		const response = await client.count({
			index: 'product_meta_data',
		})

		const totalCount = response.body.count;

		const db = await getDb();
		const collection = db.collection('product_meta_data');
    await collection.updateOne(
      { index_name: 'ebay_us_products' }, // 用索引名作为唯一标识
      { $set: { total_count: totalCount, timestamp: new Date() } },
      { upsert: true }
    );
    return new Response(JSON.stringify({ message: 'Index count saved successfully' }), { status: 200 });
	}  catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to save index count' }), { status: 500 });
  }
}

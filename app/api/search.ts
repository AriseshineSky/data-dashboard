import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const query = Array.isArray(req.query.query) ? req.query.query.join(' ') : req.query.query || '';
		const index = process.env.ELASTICSEARCH_INDEX || 'default_index';

		const result = await client.search({
			index,
			body: {
				query: {
					match: { name: query },
				},
			},
		});
		res.status(200).json(result.hits.hits || []);
	} catch (error) {
		console.error('[Elasticsearch Error]', error);
		res.status(500).json({ message: 'Error fetching data' });
	}
}


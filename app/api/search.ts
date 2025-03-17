import type {NextApiRequest, NextApiResponse} from 'next';
import client from '../../lib/elasticsearch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({message: 'Method not allowed'});
	}

	try {
		const {query} = req.query;
		const result = await client.search({
			index: '',
			body: {
				query: {
					match: {
				  	name: query || ''
					},
				},
			},
		});

		res.status(200).json(result.body.hits.hits);
	} catch (error) {
		console.error(error);
		res.status(500).json({message: 'Error fetching data'});
	}
}

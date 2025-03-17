import {Client} from '@elastic/elasticsearch'

const client = new Client({
	node: 'http://34.44.148.50',
	auth: {
		username: 'elasticuser',
		password: 'KbersRiseUp153'
	}
})

export default client;

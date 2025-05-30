import axios from 'axios';

const API_URL = 'http://localhost:8000/api/statistics';

export async function fetchStatistics() {
	const response = await axios.get(API_URL);
	return response.data;
}

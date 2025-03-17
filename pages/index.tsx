"use client"
import { useState } from 'react';

export default function Dashboard() {
	const [data, setData] = useState<any[]>([]);
	const [query, setQuery] = useState('');
	const [count, setCount] = useState<number | null>(null);  // 存储数据量

	const handleSearch = async () => {
		try {
			const response = await fetch(`/api/search?query=${query}`);
			const result = await response.json();
			setData(result);
			setCount(result.count);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
	<div className="p-8">
		<h1 className="text-2xl font-bold mb-4"> Dashboard </h1>
		<div className="flex items-center mb-4">
			<input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="border p-2 rounded mr-2 w-full" />
			<button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
				search
			</button>
		</div>
		<div className="mb-4">
			<p>Total products in ebay_us_products: {count !== null ? count : 'Loading...'}</p>
		</div>
		<div className="grid grid-cols-1 gap-4">
			{data.length > 0 ? (
				data.map((item, index) => (
					<div key={index} className="border p-4 rounded">
						<h2 className="font-semibold">{item._source.name}</h2>
						<p>{item._source.description}</p>
					</div>
				))
			) : (
				<p>No data found</p>
			)}
		</div>
	</div>
	)
}

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
			<h1 className="mb-4 text-2xl font-bold"> Dashboard </h1>
			<div className="mb-4 flex items-center">
				<input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="mr-2 w-full rounded border p-2" />
				<button onClick={handleSearch} className="bg-blue-500 px-4 py-2 text-white">
					search
				</button>
			</div>
			<div className="mb-4">
				<p>Total products in ebay_us_products: {count !== null ? count : 'Loading...'}</p>
			</div>
			<div className="grid grid-cols-1 gap-4">
				{data.length > 0 ? (
					data.map((item, index) => (
						<div key={index} className="rounded border p-4">
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

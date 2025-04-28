"use client"
import axios from 'axios';
import { useEffect, useState } from 'react'

type ReconciliationRecord = {
	id: number;
	source: string;
	check_date: string;
	site_product_count: number;
	es_product_count: number;
	created_at: string;
	updated_at: string;
}


export default function ReconciliationPage({ data }: { data: ReconciliationRecord[] }) {
	const [records, setRecords] = useState<ReconciliationRecord[]>(data);

	useEffect(() => {
	}, []);

	console.log(records)

	return (
		<div className="container mx-auto p-4">
		  <h1 className="mb-4 text-2xl font-semibold">Reconciliation Records</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Source</th>
            <th className="border px-4 py-2">Check Date</th>
            <th className="border px-4 py-2">Site Product Count</th>
            <th className="border px-4 py-2">ES Product Count</th>
            <th className="border px-4 py-2">Missing Products</th>
          </tr>
        </thead>
				<tbody>
					{
						records.map((record) => (
							<tr key={record.id}>
								<td className="border px-4 py-2">{record.id}</td>
								<td className="border px-4 py-2">{record.source}</td>
								<td className="border px-4 py-2">{record.check_date}</td>
								<td className="border px-4 py-2">{record.site_product_count}</td>
								<td className="border px-4 py-2">{record.es_product_count}</td>
								<td className="border px-4 py-2">{record.site_product_count - record.es_product_count}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

const API_BASE_URL = process.env.DATA_API_BASE_URL
export async function getServerSideProps() {
	const res = await axios.get(`${API_BASE_URL}/reconsiliation-records/`);
	const data: ReconciliationRecord[] = res.data;

	return {
		props: { data }
	};
}

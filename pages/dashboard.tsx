"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

interface DashboardItem {
	id: number;
	index_name: string;
	total_count: number;
	time_frame: string;
	count_in_timeframe: number;
	timestamp: string;
}

interface DashboardData {
	index_name: string;
	time_frame: string;
	count: number;
	status: number;
	timestamp: number;
}

const Dashboard = ({ data }: { data: DashboardData[] }) => {
	const [dashboardData, setDashboardData] = useState<DashboardData[]>(data);

	useEffect(() => {
	}, []);

	const groupedData = dashboardData.reduce((acc, curr) => {
		if (!acc[curr.index_name]) {
			acc[curr.index_name] = [];
		}
		acc[curr.index_name].push(curr);
		return acc;
	}, {} as Record<string, DashboardData[]>);

	return (
		<div>
			<h1>Dashboard Analysis</h1>
			{Object.entries(groupedData).map(([indexName, data]) => (
				<div key={indexName}>
					<h2>{indexName}</h2>
					<table>
						<thead>
							<tr>
								<th>Time Range</th>
								<th>Count</th>
								<th>Updated</th>
							</tr>
						</thead>
						<tbody>
							{data.sort((a, b) => a.status - b.status).map((item) => (
								<tr key={item.time_frame}>
									<td>{item.time_frame}</td>
									<td>{item.count}</td>
									<td>{item.timestamp}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
};

export async function getServerSideProps() {
	const res = await axios.get('http://localhost:8000/api/dashboard-analysis/');
	const data: DashboardItem[] = res.data;

	return {
		props: { data }
	};
}

export default Dashboard;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true, // ✅ 让 Next.js 在构建时忽略 ESLint 错误
	},
};

export default nextConfig;

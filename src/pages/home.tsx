import { useEffect, useState } from "react";
import { getAllBlogPosts } from "../lib/api";
import Layout from "../components/Layout";

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [recentPosts, setRecentPosts] = useState<BlogpostData[]>([]);

	useEffect(() => {
		const fetchAllBlogPosts = async () => {
			setLoading(true);
			const data = await getAllBlogPosts();

			setRecentPosts(data);
			setLoading(false);
		};

		fetchAllBlogPosts();
	}, []);

	const homeContent = !loading && recentPosts && (
		<div className="flex gap-4">
			{recentPosts.map((post) => (
				<div key={post._id} className="p-1 border border-red-100">
					{post.title}
				</div>
			))}
		</div>
	);

	return <Layout content={homeContent}></Layout>;
};

export default Home;

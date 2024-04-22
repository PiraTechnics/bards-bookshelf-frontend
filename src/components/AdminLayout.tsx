import { ReactNode } from "react";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";

interface LayoutProps {
	content: ReactNode;
}

const AdminLayout = ({ content }: LayoutProps) => {
	return (
		<div className="mx-auto min-w-screen max-w-screen-2xl min-h-screen p-2 flex flex-col">
			<AdminHeader />
			<main className="flex-1 px-6">{content}</main>
			<Footer />
		</div>
	);
};

export default AdminLayout;

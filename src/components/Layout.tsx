import { ReactNode } from "react";

interface LayoutProps {
	content: ReactNode;
}

const Layout = ({ content }: LayoutProps) => {
	return (
		<div className="min-w-screen min-h-screen p-2">
			<main className="m-4">{content}</main>
		</div>
	);
};

export default Layout;

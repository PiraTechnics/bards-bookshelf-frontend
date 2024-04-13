import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
	content: ReactNode;
}

const Layout = ({ content }: LayoutProps) => {
	return (
		<div className="mx-auto min-w-screen max-w-screen-2xl min-h-screen p-2 flex flex-col">
			<Header />
			<main className="flex-1 px-6">{content}</main>
			<Footer />
		</div>
	);
};

export default Layout;

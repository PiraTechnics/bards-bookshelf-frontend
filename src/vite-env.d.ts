/// <reference types="vite/client" />

// All Typescript Types and Prop Interfaces for Blog Data Types

interface BlogpostProps {
	postId: string;
}

type BlogpostData = {
	_id: string;
	title: string;
	body: string;
	author: {
		_id: string;
		username: string;
	};
	published: boolean;
	datePosted: string;
	dateUpdated: string;
};

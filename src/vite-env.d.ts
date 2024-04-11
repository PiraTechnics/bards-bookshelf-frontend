/// <reference types="vite/client" />

// All Typescript Types and Prop Interfaces for Blog Data Types

interface BlogpostProps {
	postSlug: string;
}

type CommentData = {
	content: string;
	datePosted: Date;
	commentor: string;
};

type BlogpostData = {
	_id: string;
	title: string;
	content: string;
	author: {
		_id: string;
		username: string;
	};
	published: boolean;
	datePosted: Date;
	dateUpdated: Date;
	slug: string;
	comments: [CommentData];
};

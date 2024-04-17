/// <reference types="vite/client" />

// All Typescript Types and Prop Interfaces for Blog Data Types

interface BlogpostProps {
	postSlug: string;
}

interface CommentProps {
	_id: string;
	content: string;
	datePosted: string;
	commentor: string;
}

type userData = {
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	admin: boolean;
};

type CommentData = {
	_id: string;
	content: string;
	datePosted: string;
	commentor: string;
};

type BlogpostData = {
	_id: string;
	title: string;
	content: string;
	author: {
		lastname: any;
		firstname: any;
		_id: string;
		username: string;
	};
	published: boolean;
	datePosted: string;
	dateUpdated: string;
	slug: string;
	comments: [CommentData];
};

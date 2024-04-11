/// <reference types="vite/client" />

// All Typescript Types and Prop Interfaces for Blog Data Types

interface BlogpostProps {
	postSlug: string;
}

type userData = {
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	admin: boolean;
};

type CommentData = {
	content: string;
	datePosted: Date;
	commentor: string;
};

type BlogpostData = {
	id: string;
	title: string;
	content: string;
	author: {
		lastname: any;
		firstname: any;
		_id: string;
		username: string;
	};
	published: boolean;
	datePosted: Date;
	dateUpdated: Date;
	slug: string;
	comments: [CommentData];
};

export interface IUser {
	_id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	banner?: string;
	website?: string;
	bio?: string;
	state?: string;
	city?: string;
	school?: string;
	work?: string;
	followers: string[];
	followings: string[];
	posts: IPost[];
	likes: IPost[];
	saves: IPost[];
	comments: string[];
}

export interface IPost {
	_id: string;
	content: string;
	author: string;
	likes: string[];
	saves: string[];
	comments: string[];
}

export interface IComment {
	_id: string;
	content: string;
	author: string;
	post: string;
}

export interface ILike {
	_id: string;
	user: string;
	post: string;
}

export interface ISave {
	_id: string;
	user: string;
	post: string;
}

export interface SuccessResponse {
	message: string;
	user: IUser;
	users: IUser[];
	posts: IPost[];
	post: IPost;
	comments: IComment[];
}

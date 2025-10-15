export interface IUser {
	_id?: string;
	name?: string;
	username?: string;
	email?: string;
	password?: string;
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
	_id?: string;
  author?: IUser;
	content?: string;
	likes?: ILike[];
	saves?: ISave[];
	comments?: IComment[];
}

export interface IComment {
	_id?: string;
	content?: string;
	author?: IUser;
	post?: string;
}

export interface ILike {
	_id?: string;
	user?: string;
	post?: string;
}

export interface ISave {
	_id?: string;
	user?: string;
	post?: string;
}

export interface SuccessResponse {
	message: string;
	user: IUser;
	users: IUser[];
	posts: IPost[];
	post: IPost;
	comments: IComment[];
}

import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { Post } from "../models";
import { IReq } from "../types";

export const createPost = asyncWrapper(async (req: IReq, res: Response) => {
	const post = await Post.create({ author: req.userId, ...req.body });
	res.status(200).json({ post });
});

export const getPosts = asyncWrapper(async (req: Request, res: Response) => {
	const posts = await Post.find().populate([
		"author",
		"likes",
		"saves",
		{ path: "comments", populate: { path: "author" } },
	]);
	res.status(200).json({ posts });
});

export const getPost = asyncWrapper(async (req: Request, res: Response) => {
	const post = await Post.findById(req.params.id).populate([
		"author",
		"likes",
		"saves",
		{ path: "comments", populate: { path: "author" } },
	]);
	res.status(200).json({ post });
});

export const updatePost = asyncWrapper(async (req: Request, res: Response) => {
	const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({ post });
});

export const deletePost = asyncWrapper(async (req: Request, res: Response) => {
	await Post.findByIdAndDelete(req.params.id);
	res.status(200).json({ message: "Post deleted Successfully." });
});

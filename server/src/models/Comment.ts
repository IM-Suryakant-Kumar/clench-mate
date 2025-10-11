import { Schema } from "mongoose";

export interface IComment extends Document {
	content: string;
	post: Schema.Types.ObjectId;
	author: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
	{
		content: { type: String, required: true },
		post: { type: String, ref: "Post", required: true },
		author: { type: String, ref: "User", required: true },
	},
	{ timestamps: true }
);

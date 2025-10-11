import { model, Schema } from "mongoose";

export interface IPost extends Document {
	content: string;
	author: Schema.Types.ObjectId;
	likes: Schema.Types.ObjectId[];
	saves: Schema.Types.ObjectId[];
	comments: Schema.Types.ObjectId[];
}

const postSchema = new Schema<IPost>(
	{
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		saves: [{ type: Schema.Types.ObjectId, ref: "User" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

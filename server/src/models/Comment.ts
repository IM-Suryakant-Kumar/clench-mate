import { model, Schema } from "mongoose";
import { Post, User } from ".";

export interface IComment extends Document {
	content: string;
	author: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
	{
		content: { type: String, required: true },
		post: { type: String, ref: "Post", required: true },
		author: { type: String, ref: "User", required: true },
	},
	{ timestamps: true }
);

commentSchema.post("save", async function () {
	await User.findByIdAndUpdate(this.author, { $push: { comments: this._id } });
	await Post.findByIdAndUpdate(this.post, { $push: { comments: this._id } });
});

commentSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await User.findByIdAndUpdate(doc.author, { $pull: { comments: doc._id } });
		await Post.findByIdAndUpdate(doc.post, { $pull: { comments: doc._id } });
	}
});

export const Comment = model<IComment>("Comment", commentSchema);

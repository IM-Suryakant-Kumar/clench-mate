import { model, Schema } from "mongoose";
import { Comment, Like, Save, User } from ".";

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
		likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
		saves: [{ type: Schema.Types.ObjectId, ref: "Save" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true }
);

postSchema.post("save", async function () {
	await User.findByIdAndUpdate(this.author, { $push: { posts: this._id } });
});

postSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await User.findByIdAndUpdate(doc.author, { $pull: { posts: doc._id } });
		const likes = await Like.find({ post: doc._id });
		likes.forEach(async (like) => {
			await Like.findByIdAndDelete(like._id);
		});
		const saves = await Save.find({ post: doc._id });
		saves.forEach(async (save) => {
			await Save.findByIdAndDelete(save._id);
		});
		await Comment.deleteMany({ post: doc._id });
	}
});

export const Post = model<IPost>("Post", postSchema);

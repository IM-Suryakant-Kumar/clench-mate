import { model, Schema } from "mongoose";
import { Post, User } from ".";

export interface ILike {
	user: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
}

const likeSchema = new Schema<ILike>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		post: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

likeSchema.post("save", async function () {
	await User.findByIdAndUpdate(this.user, { $push: { likes: this._id } });
	await Post.findByIdAndUpdate(this.post, { $push: { likes: this._id } });
});

likeSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await User.findByIdAndUpdate(doc.user, { $pull: { likes: doc._id } });
		await Post.findByIdAndUpdate(doc.post, { $pull: { likes: doc._id } });
	}
});

export const Like = model<ILike>("Like", likeSchema);

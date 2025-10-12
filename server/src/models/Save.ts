import { model, Schema } from "mongoose";
import { Post, User } from ".";

export interface ISave {
	user: Schema.Types.ObjectId;
	post: Schema.Types.ObjectId;
}

const saveSchema = new Schema<ISave>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		post: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

saveSchema.post("save", async function () {
	await User.findByIdAndUpdate(this.user, { $push: { saves: this._id } });
	await Post.findByIdAndUpdate(this.post, { $push: { saves: this._id } });
});

saveSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await User.findByIdAndUpdate(doc.user, { $pull: { saves: doc._id } });
		await Post.findByIdAndUpdate(doc.post, { $pull: { saves: doc._id } });
	}
});

export const Save = model<ISave>("Save", saveSchema);

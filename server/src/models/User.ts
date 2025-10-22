import { Document, Schema } from "mongoose";
import { compare, genSalt, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { model } from "mongoose";

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	banner?: string;
	website?: string;
	bio?: string;
	country?: string;
	state?: string;
	city?: string;
	school?: string;
	work?: string;
	followers: Schema.Types.ObjectId[];
	followings: Schema.Types.ObjectId[];
	posts: Schema.Types.ObjectId[];
	likes: Schema.Types.ObjectId[];
	saves: Schema.Types.ObjectId[];
	comments: Schema.Types.ObjectId[];

	comparePassword(candidatePassword: string): Promise<boolean>;
	createJWTToken(): string;
}

const userSchema = new Schema<IUser>(
	{
		name: { type: String, minlength: 3, required: true },
		username: { type: String, minlength: 3, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, minlength: 3, required: true, select: false },
		banner: { type: String },
		avatar: { type: String },
		website: { type: String },
		bio: { type: String },
		country: { type: String },
		state: { type: String },
		city: { type: String },
		school: { type: String },
		work: { type: String },
		followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
		followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
		likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
		saves: [{ type: Schema.Types.ObjectId, ref: "Save" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await genSalt(10);
	this.password = await hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	return await compare(candidatePassword, this.password);
};

userSchema.methods.createJWTToken = function () {
	return sign({ _id: this._id }, process.env.JWT_SECRET!, {
		expiresIn: "1d",
	});
};

export const User = model<IUser>("User", userSchema);

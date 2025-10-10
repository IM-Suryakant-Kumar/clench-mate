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
	state?: string;
	city?: string;
	school?: string;
	work?: string;

	comparePassword(candidatePassword: string): Promise<boolean>;
	createJWTToken(): string;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			minlength: [3, "name should not be less than 3 characters"],
			required: [true, "Please provide name"],
		},
		username: {
			type: String,
			minlength: [3, "name should not be less than 3 characters"],
			required: [true, "Please provide name"],
		},
		email: {
			type: String,
			required: [true, "Please provide email"],
			unique: true,
		},
		password: {
			type: String,
			minlength: [4, "password should not be less than 4 chracters"],
			required: [true, "Please provide password"],
			select: false,
		},
		banner: {
			type: String,
		},
		avatar: {
			type: String,
		},
		website: {
			type: String,
		},
		bio: {
			type: String,
		},
		state: {
			type: String,
		},
		city: {
			type: String,
		},
		school: {
			type: String,
		},
		work: {
			type: String,
		},
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

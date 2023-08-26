import mongoose, { Mongoose, Types } from "mongoose";
const { Schema } = mongoose as Mongoose;

enum Gender {
	Male = "male",
	Female = "female",
}

interface MemberSchema {
	firstName: string;
	lastName: string;
	nickName: string;
	phone: string;
	gender: Gender;
	email: string;
	yearOfBirth: string;
	monthOfBirth: string;
	position: string[];
	team: unknown;
	updatedBy: unknown;
}

const memberSchema = new Schema<MemberSchema>(
	{
		firstName: {
			type: String,
			require: true,
		},
		lastName: {
			type: String,
			require: true,
		},
		nickName: {
			type: String,
		},
		phone: {
			type: String,
			require: true,
			unique: true,
		},
		gender: {
			type: String,
			require: true,
		},
		email: {
			type: String,
		},
		yearOfBirth: {
			type: String,
			require: true,
		},
		monthOfBirth: {
			type: String,
		},
		position: {
			type: [String],
		},
		team: {
			type: Types.ObjectId,
			ref: "Team",
			require: true,
		},
		updatedBy: {
			type: Types.ObjectId,
			ref: "Admin",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Member = mongoose.model("Member", memberSchema);

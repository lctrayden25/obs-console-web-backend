import mongoose, { Mongoose, Types } from "mongoose";
const { Schema } = mongoose as Mongoose;

const memberSchema = new Schema(
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
			type: String,
			default: "Rayden Li",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Member = mongoose.model("Member", memberSchema);

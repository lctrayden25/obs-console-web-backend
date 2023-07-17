import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

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
		},
		gender: {
			type: String,
			require: true,
		},
		email: {
			type: String,
		},
		dateOfYear: {
			type: Number,
			require: true,
		},
		dateOfMonth: {
			type: Number,
		},
		position: {
			type: [String],
		},
		updatedBy: {
			type: String,
			default: "Rayden Li",
		},
		team: [{ type: Schema.Types.ObjectId, ref: "Team" }],
	},
	{
		timestamps: true,
	}
);

export const Member = mongoose.model("Member", memberSchema);

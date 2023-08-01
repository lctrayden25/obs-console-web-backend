import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose as Mongoose;

const teamSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		memberCount: {
			type: Number,
		},
		joinAt: {
			type: Date
		},
		updatedBy: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const Team = mongoose.model("Team", teamSchema);

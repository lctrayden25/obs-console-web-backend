import mongoose, { Mongoose, Types } from "mongoose";
const { Schema } = mongoose as Mongoose;

interface TeamSchema {
	name: string;
	memberCount: number;
	joinAt: number;
	updatedBy: unknown;
}

const teamSchema = new Schema<TeamSchema>(
	{
		name: {
			type: String,
			require: true,
		},
		memberCount: {
			type: Number,
		},
		joinAt: {
			type: Number,
			default: null
		},
		updatedBy: {
			type: String,
			default: null
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Team = mongoose.model("Team", teamSchema);

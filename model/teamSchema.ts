import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose as Mongoose;

interface TeamSchema {
	name: string;
	memberCount: number;
	joinAt: Date;
	updatedBy: string;
	createdAt: Date;
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
			type: Date,
		},
		updatedBy: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Team = mongoose.model("Team", teamSchema);

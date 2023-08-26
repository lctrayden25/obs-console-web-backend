import mongoose, { Mongoose, Types } from "mongoose";
const { Schema } = mongoose as Mongoose;

interface TeamSchema {
	name: string;
	memberCount: number;
	joinAt: Date;
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
			type: Date,
		},
		updatedBy: {
			type: Types.ObjectId,
			ref: "Admin",
			require: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Team = mongoose.model("Team", teamSchema);

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
		age: {
			type: String,
		},
		dateOfBirth: {
			type: Date,
			require: true,
		},
		position: {
			type: [String],
		},
		updatedBy: {
			type: String,
		},
		team: [{ type: Schema.Types.ObjectId, ref: "Team" }],
	},
	{
		timestamps: true,
	}
);

export const Member = mongoose.model("Member", memberSchema);
// module.exports = Member;

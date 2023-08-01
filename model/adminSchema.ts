import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose as Mongoose;

const adminSchema = new Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		role: {
			type: String,
			require: true,
			default: "Admin",
		},
	},
	{
		timestamps: true,
	}
);

export const Admin = mongoose.model("Admin", adminSchema);

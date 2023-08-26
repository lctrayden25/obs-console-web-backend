import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose as Mongoose;

enum UserRole {
	Admin = "admin",
}

interface AdminSchema {
	email: string;
	password: string;
	role: UserRole;
	createdAt: Date;
}

const adminSchema = new Schema<AdminSchema>(
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
			default: UserRole.Admin,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Admin = mongoose.model("Admin", adminSchema);

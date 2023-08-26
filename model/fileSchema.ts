import mongoose, { Mongoose, Types } from "mongoose";
import { Schema } from "mongoose";

interface FileSchema {
	name: string;
	url: string;
	key: Types.ObjectId;
	size: number;
	contentType: string;
}

const fileSchema = new Schema<FileSchema>(
	{
		name: {
			type: String,
			require: false,
		},
		url: {
			type: String,
			require: true,
		},
		key: {
			require: true,
		},
		size: {
			type: Number,
			require: true,
		},
		contentType: {
			type: String,
			require: true,
		},
	},
	{
		versionKey: false,
		timestamps: false,
		_id: false,
	}
);

export const File = mongoose.model("File", fileSchema);

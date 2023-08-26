import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const fileSchema = new Schema({
	name: {
		type: String,
		require: false,
	},
	url: {
		type: String,
		require: true,
	},
	key: {
		type: mongoose.Types.ObjectId,
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
},{
	versionKey: false,
	timestamps: false
});

export const File = mongoose.model("File", fileSchema);

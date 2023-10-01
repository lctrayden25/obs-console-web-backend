import { Types } from "mongoose";
import { Gender, PlayerPosition } from "./common";

export type MemberType = {
	firstName: string;
	lastName: string;
	phone: string;
	gender: Gender;
	email: string;
	dateOfYear: number;
	dateOfMonth: number;
	position: [PlayerPosition];
	team: Types.ObjectId;
	updatedBy: string;
};
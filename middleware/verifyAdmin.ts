import { Request, Response, NextFunction } from "express";

export const verifyAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { obs_token } = req.cookies;
	if (!obs_token) {
		res.status(403);
		throw new Error("403 Forbidden");
	}
	next();
};

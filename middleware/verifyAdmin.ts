import { Request, Response, NextFunction } from "express";

export const verifyAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { obs_token } = req.cookies;
	if (!obs_token) {
		return res.json({ error: "403 Forbidden - Token not found" }).status(403);
	}
	next();
};

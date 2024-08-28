import { Request, Response, NextFunction } from 'express';

export function CharsetMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	next();
}

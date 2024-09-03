import { Request, Response, NextFunction } from 'express';

export function CharsetMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('Content-Encoding', 'utf-8');
	next();
}

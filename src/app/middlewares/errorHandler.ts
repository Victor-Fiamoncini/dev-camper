import { NextFunction, Request, Response } from 'express'

export default (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err)

	res.status(500).json({ error: `${err.name} - ${err.message}` })
}

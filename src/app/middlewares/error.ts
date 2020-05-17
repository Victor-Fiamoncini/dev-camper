import { NextFunction, Request, Response } from 'express'
import ErrorResponse from '../utils/ErrorResponse'

export default (
	err: ErrorResponse,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.stack)

	res.status(err._status || 500).json({ error: err.message || 'Server error' })

	next()
}

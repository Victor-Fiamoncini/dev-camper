import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import database from './app/database'

export default class App {
	private app: Application

	public constructor() {
		this.app = express()

		this.middlewares()
	}

	public get _app(): Application {
		return this.app
	}

	private middlewares(): void {
		this.app.use(express.json())
		this.app.use(morgan('dev'))
		this.app.use(cors())
		this.app.use(database)
	}
}

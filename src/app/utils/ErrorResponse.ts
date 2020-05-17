export default class ErrorResponse extends Error {
	private status: number

	public constructor(message: string, status: number) {
		super(message)
		this.status = status
	}

	public get _status(): number {
		return this.status
	}
}

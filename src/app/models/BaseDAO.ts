export default abstract class BaseDAO<T> {
	public abstract async store(dto: T): Promise<any>

	public abstract async index(): Promise<any>

	public abstract async show(id: string): Promise<any>

	public abstract async update(dto: T, id: string): Promise<any>

	public abstract async destroy(id: string): Promise<any>
}

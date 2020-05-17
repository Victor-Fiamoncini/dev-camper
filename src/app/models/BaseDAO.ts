export default abstract class BaseDAO<T> {
	public abstract async store(dto: T): Promise<T>

	public abstract async index(): Promise<T[]>

	public abstract async show(id: string): Promise<T>

	public abstract async update(dto: T, id: string): Promise<T>

	public abstract async destroy(id: string): Promise<T>
}

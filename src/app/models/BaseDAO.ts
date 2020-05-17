export default abstract class BaseDAO<T> {
	public abstract async store(dto: T): Promise<T | null>

	public abstract async index(): Promise<T[] | null>

	public abstract async show(id: string): Promise<T | null>

	public abstract async update(id: string, dto: T): Promise<T | null>

	public abstract async destroy(id: string): Promise<T | null>
}

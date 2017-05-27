export interface CrudService<T> {
  create(type: T): Promise<T>
  read(filter?: any): Promise<T[]>
  update(type: T): Promise<T>
  delete(type: T): Promise<T>
}

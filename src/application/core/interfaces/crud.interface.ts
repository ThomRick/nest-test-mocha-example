export interface CrudService<T> {
  create(type: T): Promise<T>
  read(filter?: any): Promise<Array<T>>
  update(type: T): Promise<T>
  delete(type: T): Promise<T>
}

import { Predicate } from '../../utils/function'


export type Validator<T extends {}> = {
  [K in keyof T]: Predicate<T[K]>
}

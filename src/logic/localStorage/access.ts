import { Predicate } from '../../utils/function'


/**
 * Returns saved item typed as given type if the key exists in local storage and the item is valid.
 * If not, saves the given default value in local storage and returns it.
 */
export const getValidatedTypeFromLS = <T extends string>(
  key: string | undefined,
  validator: Predicate<T>,
  defaultValue: T,
): T => {
  if (key === undefined) {
    return defaultValue
  }

  const item = localStorage.getItem(key)

  if (item === null || !validator(item as T)) {
    localStorage.setItem(key, defaultValue)
    return defaultValue
  }

  return item as T
}

/**
 * Saves given key-value pair into local storage if the key is defined.
 */
export const saveToLS = (key: string | undefined, value: string | number | boolean): void => {
  if (key !== undefined) {
    localStorage.setItem(key, value.toString())
  }
}

export const range = (size: number): number[] => {
  return Array(size).fill(0).map((_, i) => i)
}

export const getDuplicates = <T> (array: T[], compare: (a: T, b: T) => boolean): T[] => {
  const result = []

  for (let i = 0; i < array.length; ++i) {
    const item1 = array[i]
    for (let j = 0; j < array.length; ++j) {
      const item2 = array[j]
      if (i !== j && compare(item1, item2)) {
        result.push(item1)
        break
      }
    }
  }

  return result
}

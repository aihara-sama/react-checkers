export function getAllItemsExcept(arr1, arr2) {
  const result = [...arr1]
  arr2.forEach(
    (el) => result.includes(el) && result.splice(result.indexOf(el), 1),
  )
  return result
}

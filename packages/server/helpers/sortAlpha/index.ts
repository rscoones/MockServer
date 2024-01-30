export default function sortAlpha<T>(arr: T[], key: keyof T) {
  arr.sort(function (a, b) {
    if (a[key] > b[key]) {
      return 1
    } else if (a[key] < b[key]) {
      return -1
    } else {
      return 0
    }
  })

  return arr
}

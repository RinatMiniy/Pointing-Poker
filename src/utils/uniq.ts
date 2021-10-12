export default function uniq(arr: Array<T>) {
  const uniqArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr.slice(i + 1).includes(arr[i])) {
      uniqArr.push(arr[i]);
    }
  }
  return uniqArr;
}

export default function count(arr: Array<T>, countBy: T) {
  let n = 0;
  arr.forEach((el) => (el === countBy ? n++ : n + 0));
  return n;
}

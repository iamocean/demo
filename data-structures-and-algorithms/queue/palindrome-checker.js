/**
 * 回文检测
 */
 function palindromeChecker(str) {
  if (str === undefined || str === null || (str !== null && str.length === 0)) {
    return false;
  }
  const deque = new Deque();
  const lowerString = str.toLocaleLowerCase().split(' ').join('');
  let isEqual = true;
  let firstChar;
  let lastChar;
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}

console.log('palindromeChecker(null)', palindromeChecker(null));
console.log('palindromeChecker(hello)', palindromeChecker('hello OCEAN'));
console.log('palindromeChecker(level)', palindromeChecker('level'));
console.log('palindromeChecker(LEVEL)', palindromeChecker('LEVEL'));
console.log('palindromeChecker(a)', palindromeChecker('a'));
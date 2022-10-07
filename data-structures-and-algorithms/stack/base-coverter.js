import { Stack } from './object';
/**
 * 将十进制转成任意进制
 */
 function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';

  if (!base >= 2 && base <= 36) {
    return '';
  }
  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }
  return baseString;
}

console.log('baseConverter to 2', baseConverter(168, 2));
console.log('baseConverter to 8', baseConverter(168, 8));
console.log('baseConverter to 16', baseConverter(168, 16));
console.log('baseConverter to 32', baseConverter(168, 32));
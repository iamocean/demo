/**
 * 创建一个基于 JavaScript 对象的 Stack 类
 * 时间复杂度 O(1)
 */
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  // 添加栈
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  // 移除栈
  pop() {
    if (this.isEmpty) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  // 获取栈顶
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
  // 栈是否为空
  isEmpty() {
    return this.count === 0;
  }
  // 栈大小
  size() {
    return this.count;
  }
  // 清空栈
  clear() {
    this.count = 0;
    this.items = {};

    // LIFO 后进先出
    // while(!this.isEmpty()) {
    //   this.pop();
    // }
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objectString = `${this.items[0]}`;
    for (let i=1; i<this.count; i++) {
      objectString = `${objectString}, ${this.items[i]}`;
    }
    return objectString;
  }
}

const stack = new Stack();
stack.push(5);
stack.push(8);
console.log('stack', stack);
console.log('stack.peek', stack.peek());
console.log('stack.isEmpty', stack.isEmpty());
console.log('stack.toString', stack.toString());
stack.push(11);
console.log('stack.toString', stack.toString());

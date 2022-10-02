/**
 * 栈数据结构
 * 时间复杂度 O(n)
 */
class Stack {
  constructor() {
    this.items = [];
  }
  // 添加栈元素
  push(element) {
    this.items.push(element);
  }
  // 删除栈元素
  pop() {
    return this.items.pop();
  }
  // 查看栈顶最后一次添加的元素
  peek() {
    return this.items[this.items.length - 1];
  }
  // 栈元素是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  // 栈大小
  size() {
    return this.items.length;
  }
  // 清空栈元素
  clear() {
    this.items = [];
  }
}

const stack = new Stack();
console.log('stack.isEmpty()', stack.isEmpty());
stack.push(5);
stack.push(8);
console.log('stack.push', stack);
console.log('stack.peek()', stack.peek());
stack.push(11);
console.log('stack.push', stack);
console.log('stack.size()', stack.size());
console.log('stack.empty()', stack.isEmpty());
stack.push(15);
console.log('stack.push', stack);
stack.pop();
stack.pop();
console.log('stack', stack);
console.log('stack.size', stack.size());
console.log('stack.toString', stack.toString());
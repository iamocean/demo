/**
 * 双端队列
 */
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  // 双端队列前端添加元素
  addFront(element) {
    if (this.isEmpty()) {
      // 双端队列为空的情况
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      // 双端队列前端被移除过的情况
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      // this.lowestCount 为 0 的情况
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }
  // 双端队列后端添加元素
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }
  // 双端队列前端移除第一个元素
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  // 双端队列后端移除第一个元素
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  // 双端队列前端的第一个元素
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  // 双端队列后端的第一个元素
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
  // 双端队列是否为空
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }
  // 双端队列长度
  size() {
    return this.count - this.lowestCount;
  }
  // 清空双端队列
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objectString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objectString = `${objectString}, ${this.items[i]}`;
    }
    return objectString;
  }
}

const deque = new Deque();
console.log('deque.isEmpty', deque.isEmpty());
deque.addBack('HELLO');
deque.addBack('ALGORITHMS');
console.log('deque.size', deque.size());
console.log('deque.toString', deque.toString());
deque.addBack('OCEAN');
console.log('deque.toString', deque.toString());
console.log('deque.isEmpty', deque.isEmpty());
console.log('deque.peekFront', deque.peekFront());
console.log('deque.peekBack', deque.peekBack());
deque.removeBack();
console.log('deque.toString', deque.toString());
deque.removeFront();
console.log('deque.toString', deque.toString());
console.log('deque.peekFront', deque.peekFront());
console.log('deque.peekBack', deque.peekBack());
deque.addFront('HELLO');
console.log('deque.toString', deque.toString());
deque.clear();
console.log('deque.toString', deque.toString());
console.log('deque.isEmpty', deque.isEmpty());

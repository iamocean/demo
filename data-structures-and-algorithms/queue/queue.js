/**
 * 队列
 */
class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  // 添加元素
  enqueue (element) {
    this.items[this.count] = element;
    this.count++;
  }
  // 删除元素
  dequeue () {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  // 队头元素
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  // 队列是否为空
  isEmpty() {
    // return this.size() === 0;
    return this.count - this.lowestCount === 0;
  }
  // 队列长度
  size() {
    return this.count - this.lowestCount;
  }
  // 清空队列
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

const queue = new Queue();
console.log('queue.isEmpty', queue.isEmpty());
queue.enqueue('HELLO');
queue.enqueue('alogithms');
queue.enqueue('OCEAN');
console.log('queue.toString', queue.toString());
console.log('queue.toString', queue.toString());
console.log('queue.isEmpty', queue.isEmpty());
console.log('queue.size', queue.size());
queue.dequeue();
queue.dequeue();
console.log('queue.toString', queue.toString());
console.log('queue.size', queue.size());
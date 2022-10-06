import { Queue } from './queue';

function hotPotato(elementList, num) {
  const queue = new Queue();
  const elimitatedList = [];
  for (let i = 0; i < elementList.length; i++) {
    // 把名单列表先加入到队列
    queue.enqueue(elementList[i]);
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    elimitatedList.push(queue.dequeue());
  }

  return {
    elimitated: elimitatedList,
    winner: queue.dequeue(),
  }
}

const names = ['HELLO', 'HAI', 'OCEAN'];
const result = hotPotato(names, 5);
result.elimitated.forEach((name) => {
  console.log(`${name} 在击鼓传花游戏中被淘汰了。`);
});
console.log(`击鼓传花游戏最后的胜利者是：${result.winner}`);
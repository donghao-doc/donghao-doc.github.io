# Promise

Promise 是 JS 中异步编程的新的解决方案（旧方案是使用回调函数），可以用来封装异步操作，在之后可以通过 promise 对象获取异步操作成功或失败的结果。

## 同步回调与异步回调

|      | 描述            | 典型场景                                    |
|------|---------------|-----------------------------------------|
| 同步回调 | 立即执行，不会放入回调队列 | 数组遍历（`forEach`/`map`）、Promise 执行器       |
| 异步回调 | 放入回调队列，将来执行   | HTTP 请求回调、定时器回调、`Promise.then/catch` 回调 |

## Promise 基本使用

```js
const p = new Promise((resolve, reject) => {  // 执行器函数（同步回调）
  // 异步任务放在执行器回调中执行
  setTimeout(() => {
    if (/* 异步任务成功 */) {
      resolve(value)
    } else {
      reject(error)
    }
  }, 1000);
})

p.then(value => {  // promise 成功执行的回调
  console.log('成功', value)
}, error => {  // promise 失败执行的回调
  console.log('失败', error)
})
```

:::tip
`then()` 和执行器函数是同步执行，`then()` 中的回调函数是异步执行。
:::

## then/catch/finally

- `then(onResolved, onRejected)` 用于指定成功和失败的回调。
- `catch(onRejected)` 用于指定失败的回调（相当于 `then(null, onRejected)`），也可以用于捕获错误。
- `finally()`：无论成功/失败都会执行，不会改变 promise 的结果。

:::tip
这些方法都会返回一个新的 promise 对象，以支持链式调用。
:::

:::code-group

```js [then]
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
    reject('失败')  // promise 的状态只能被更改一次，这里的 reject 是无效的
  }, 1000)
})
  .then(value => {
    console.log('value:', value)  // value: 成功
  }, (error) => {
    console.log('error:', error)  // 不会输出
  })
```

```js [catch]
new Promise((resolve, reject) => {
  setTimeout(() => {
    if(成功) {
      resolve(value)
    } else { 
      reject(error)
    }
  }, 1000)
})
  // 如果失败，then 中没有处理异常
  .then(value => {
    console.log(value)
  })
  // 异常会传递到 catch 中处理
  .catch(error => {
    console.log(error)
  })

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 2000)
})
  .then(value => {
    console.log(value123)  // 不会输出
  })
  .catch(error => {
    console.log(error)  // ReferenceError: value123 is not defined
  })
```

```js [finally]
let isLoading = true

fetchData()
  .then(data => console.log('成功', data))
  .catch(error => console.log('失败', error))
  .finally(() => {  // 无论成功还是失败，都会执行
    isLoading = false
  })
```

:::

## Promise 的静态方法

| 方法                                  | 描述                                                |
|-------------------------------------|---------------------------------------------------|
| `Promise.resolve(value)`            | 快速创建一个 `fulfilled` 状态的 promise                    |
| `Promise.reject(error)`             | 快速创建一个 `rejected` 状态的 promise                     |
| `Promise.all([p1, p2, ...])`        | 并行执行多个 Promise，所有的都成功就返回成功的数组，只要有一个失败了就返回失败的那个的结果 |
| `Promise.allSettled([p1, p2, ...])` | 并行执行多个 Promise，所有的任务都完成后（无论成功或失败），返回包含所有状态的结果数组   |
| `Promise.race([p1, p2, ...])`       | 多个 Promise 赛跑，返回第一个成功或失败的结果                       |
| `Promise.any([p1, p2, ...])`        | 只要有一个成功就返回成功的那个的结果，如果所有的都失败则返回失败的数组               |

:::tip
以上方法都会返回一个新的 promise 对象，以支持链式调用。
:::

:::code-group

```js [并行请求]
const request1 = fetch('/api/user');
const request2 = fetch('/api/orders');

Promise.all([request1, request2])
  .then(([userRes, ordersRes]) => {
    return Promise.all([userRes.json(), ordersRes.json()])
  })
  .then(([user, orders]) => {
    console.log('所有数据', user, orders)
  })
  .catch((error) => {
    console.log('第一个失败请求', error)
  });
```

```js [超时控制]
// 封装超时函数
function withTimeout(promise, timeoutMs, msg) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(msg)), timeoutMs)
  );

  // 限制异步操作时间，如请求超时提示
  return Promise.race([promise, timeoutPromise]);
}

// 请求超过 3 秒则超时
withTimeout(fetch('/api/largeData'), 3000, '请求超时，请重试')
  .then((res) => res.json())
  .catch((error) => console.log(error.message));
```

```js [批量结果统计]
const uploads = [uploadFile(file1), uploadFile(file2), uploadFile(file3)];

Promise.allSettled(uploads)
  .then((results) => {
    const successCount =
      results.filter(r => r.status === 'fulfilled').length;
    const failCount =
      results.filter(r => r.status === 'rejected').length;
    console.log(`上传完成：成功 ${successCount} 个，失败 ${failCount} 个`);
  });
```

:::

## 几个关键问题

### Promise 的状态

- 一个 promise 刚被 new 出来的时候，状态是 `pending`。
- 异步操作成功时，调用 `resolve()`，状态从 `pending` 变成 `fulfilled`。
- 异步操作失败时，调用 `reject()`，状态从 `pending` 变成 `rejected`。
- 抛出异常，状态从 `pending` 变成 `rejected`。

:::tip
Promise 的状态只能改变一次，一旦状态从 `pending` 变成 `fulfilled`/`rejected`，后续再调用 `resolve`/`reject` 都无效。
:::

### then 返回的新 promise 的结果状态由什么决定？

由 `then()` 指定的回调函数的返回值决定。

- 回调函数返回的是非 promise 的值，新 promise 就是成功的，value 为返回的值。
- 回调函数返回的是 promise，这个 promise 的状态和结果就会作为新 promise 的状态和结果。
- 回调函数抛出异常，新 promise 就是失败的，error 为抛出的异常。

:::code-group

```js [返回非 promise]
let p = new Promise((resolve, reject) => {
  resolve('ok');
});

let result = p.then(value => {
  console.log(value);  // 没有 return，即返回值为 undefined
}, reason => {
  console.warn(reason);
});

console.log(result);  // 成功的 promise，值为 undefined
```

```js [返回 promise]
new Promise((resolve, reject) => {
  reject('1');
})
  .then(
    value => console.log('onResolved1:', value),
    reason => {
      console.log('onRejected1:', reason); // onRejected1: 1
      return new Promise((resolve, reject) => {
        resolve('2');
      });
    }
  )
  .then(
    value => {
      console.log('onResolved2:', value); // onResolved2: 2
    },
    reason => console.log('onRejected2:', reason)
  )
  .then(
    value => console.log('onResolved3:', value), // onResolved3: undefined
    reason => console.log('onRejected3:', reason)
  );
```

```js [抛出异常]
let p = new Promise((resolve, reject) => {
  resolve('ok');
});

let result = p.then(value => {
  throw '1';
}, reason => {
  console.warn(reason);
});

console.log(result); // 失败的 promise，值为 1
```

:::

### 链式调用

`then()` 的执行依赖于上一步的执行结果。

:::code-group

```js [示例1]
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('OK');
  }, 1000);
})
  .then(value => {
    return new Promise((resolve, reject) => {
      resolve('success');
    });
  })
  .then(value => {
    console.log(value); // success
  })
  .then(value => {
    console.log(value); // undefined
  })
```

```js [示例2]
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行任务1(异步)')
    resolve(1)
  }, 1000)
})
  .then(value => {
    console.log('任务1的结果', value)
    console.log('执行任务2(同步)')
    return 2
  })
  .then(value => {
    console.log('任务2的结果', value)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('执行任务3(异步)')
        resolve(3)
      }, 1000)
    })
  })
  .then(value => {
    console.log('任务3的结果', value)
  })

// 执行任务1(异步)
// 任务1的结果 1
// 执行任务2(同步)
// 任务2的结果 2
// 执行任务3(异步)
// 任务3的结果 3
```

```js [示例3]
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
  .then(value => {
    console.log(value)  // 1
    return 2
  })
  .then(value => {
    console.log(value)  // 2
    // 异步任务没有放在 Promise 中，所以这个回调 return 的是 undefined
    setTimeout(() => {
      return 3
    }, 1000)
  })
  .then(value => {
    console.log(value)  // undefined
  })
```

:::

### 异常传透

若链式调用中某一步发生错误但未处理（如未写 `then` 的第二个参数或 `catch`），异常会“传透”到后续最近的 `catch`。

```js
new Promise((resolve, reject) => {
  reject(1)
})
  .then(value => {
    console.log('onResolved1()', value)
    return 2
  })
  .then(value => {
    console.log('onResolved2()', value)
    return 3
  })
  .then(value => {
    console.log('onResolved3()', value)
  })
  .catch(reason => {
    console.log('onRejected1()', reason)  // onRejected1() 1
  })
```

## async/await

`async` 函数的返回值是 promise 对象，promise 的结果由 `async` 函数的返回值决定。

- 若返回普通值，则 promise 为 `fulfilled` 状态。
- 若返回 promise，则 promise 的结果作为新 promise 的结果。
- 若抛出错误，则 promise 为 `rejected` 状态。

```js
// 返回成功的 promise，值是 1
async function fn1() {
  return 1
}

// 返回成功的 promise，值是 2
async function fn2() {
  return Promise.resolve(2)
}

// 返回失败的 promise，值是 3
async function fn3() {
  return Promise.reject(3)
}

// 返回失败的 promise，值是 4
async function fn4() {
  throw 4
}
```

`await` 右侧的表达式可以是 promise 对象，也可以是普通值。

- 如果是 promise 对象，`await` 返回的是 promise 成功的值，如果 promise 失败，会抛出异常，要用 `try...catch` 捕获。
- 如果是普通值，则直接返回该值。

:::code-group

```js [await 成功的 promise]
function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

async function fn2() {
  const result = await fn1()
  console.log(result)  // 1
}
```

```js [await 失败的 promise]
function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(2)
    }, 1000)
  })
}

async function fn2() {
  try {
    const result = await fn1()
    console.log('result:', result)
  } catch (error) {
    console.log('error:', error)  // error: 2
  }
}
```

```js [await 普通值]
async function fn() {
  const result = await 3
  console.log('result:', result)  // result: 3
}
```

:::

多个独立的 `await` 会串行执行，若需并行，可以使用 `Promise.all`。

```js
// 串行执行，总耗时 1s + 1s = 2s
async function serialAwait() {
  const res1 = await fetchData(); // 1s
  const res2 = await fetchData(); // 再等 1s
}

// 并行执行，总耗时 ≈ 1s
async function parallelAwait() {
  const promise1 = fetchData();
  const promise2 = fetchData();
  const [res1, res2] = await Promise.all([promise1, promise2]);
}
```

## 事件循环

JS 是单线程的，为了协调同步任务与异步任务的执行顺序，避免代码阻塞，引入了**事件循环（Event Loop）** 机制。

事件循环执行流程：

1. JS 在执行代码时，如果是同步任务就立即执行，如果是异步任务，就把异步任务的回调添加到任务队列中，将来执行。等同步任务全都执行完，再去执行任务队列中的异步任务。
2. 任务队列中的异步任务又可以分为“宏任务”和“微任务”，优先执行微任务，中途如果产生新的微任务，会加入「微任务队列」尾部，继续优先执行（微任务可以插队），直到「微任务队列」被清空。
3. 浏览器环境下，「微任务队列」清空后会触发一次 UI 渲染（更新 DOM、样式等），Node 环境无此步骤。
4. UI 渲染完成后，从「宏任务队列」中取出第一个宏任务来执行，执行完毕后，再次检查「微任务队列」，若产生了新的微任务，就再次清空「微任务队列」，形成“事件循环”。

:::tip
- 宏任务：例如定时器回调、DOM 事件回调、ajax 回调。
- 微任务：例如 `Promise.then/catch` 的回调、MutationObserver 的回调。
:::

```js
console.log('1');

// 宏任务：setTimeout
setTimeout(() => {
  console.log('2');
  // 微任务：在宏任务中产生新微任务
  Promise.resolve().then(() => console.log('3'));
}, 0);

// 微任务：Promise.then
Promise.resolve().then(() => {
  console.log('4');
  // 微任务：在微任务中产生新微任务
  Promise.resolve().then(() => console.log('5'));
});

console.log('6');

// 最终输出顺序：1 → 6 → 4 → 5 → 2 → 3
```

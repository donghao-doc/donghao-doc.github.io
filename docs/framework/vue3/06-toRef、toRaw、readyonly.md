---
sidebar_position: 6
---

# toRef、toRaw、readonly

## toRefs、toRef

作用：将一个响应式对象中的属性，转换为 `ref` 对象。

备注：`toRefs` 与 `toRef` 功能一致，但 `toRefs` 可以批量转换。

```ts
import { reactive, toRefs, toRef } from 'vue'

let person = reactive({ name: '张三', age: 18, gender: '男' })

// 通过解构赋值的方式获取到的 name 和 age，是不具有响应式的
// 这相当于：let name = person.name; let age = person.age
// 所以 name 和 age 相当于是声明的一个新的变量，因此不具有响应式，修改 name 和 age 也无法触发页面更新
// let { name, age } = person

// 通过 toRefs 将 person 对象中的 n 个属性批量取出，且依然保持响应式的能力
let { name, gender } = toRefs(person)

// 通过 toRef 将 person 对象中的 age 属性取出，且依然保持响应式的能力
let age = toRef(person, 'age')

function changeName() {
  // 修改 name.value，也会修改 person.name 的值
  name.value += '~'
}
function changeAge() {
  // 修改 age.value，也会修改 person.age 的值
  age.value += 1
}
function changeGender() {
  // 修改 gender.value，也会修改 person.gender 的值
  gender.value = '女'
}
```

## toRef 注意事项

```ts
import { reactive, toRef } from 'vue'

// 如果原始对象不是响应式的，可以修改数据，但不会更新视图
// const obj = { a: 1, b: 2 }

// 如果原始对象是响应式的，可以修改数据，并且会更新视图
const obj = reactive({ a: 1, b: 2 })

const a = toRef(obj, 'a')

const handleAdd = () => {
  a.value += 1
}
```

为什么原始对象不是响应式的，使用 `toRef` 转化成 ref 对象后，仍然无法更新视图？

```ts title="toRef 源码"
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K]
): ToRef<T[K]> {
  const val = object[key];
  // 1. 如果原始对象是 ref 对象就直接返回，否则调用 ObjectRefImpl 创建一个类 ref 对象并返回
  return isRef(val) ? val : (new ObjectRefImpl(object, key, defaultValue) as any);
}

class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true;

  constructor(
    private readonly _object: T,
    private readonly _key: K,
    private readonly _defaultValue?: T[K]
  ) {}

  // 2. 类 ref 对象只是做了值的改变，并未处理“收集依赖”和“触发依赖”的过程
  //    所以普通对象无法更新视图
  get value() {
    const val = this._object[this._key];
    return val === undefined ? (this._defaultValue as T[K]) : val;
  }

  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
```

## toRaw、markRaw

`toRaw` 用于将响应式对象转化为普通对象，使其不具有响应式，不触发页面的更新。
- 何时使用：在需要将响应式对象传递给 Vue 以外的库或外部系统时，使用 `toRaw` 可以确保它们收到的是普通对象。

`markRaw` 用于标记一个对象，使其**永远不会**变成响应式的。
- 例如使用 `mockjs` 时，为了防止误把 `mockjs` 变为响应式对象，可以使用 `markRaw` 去标记 `mockjs`。

```js
import { reactive, toRaw, markRaw, isReactive } from 'vue'

// 响应式对象
let person = reactive({ name: 'tony', age: 18 })
// 原始对象，不具有响应式
let rawPerson = toRaw(person)

let citys = markRaw([
  { id: 'asdda01', name: '北京' }, { id: 'asdda02', name: '上海' },
  { id: 'asdda03', name: '天津' }, { id: 'asdda04', name: '重庆' }
])
// 根据原始对象 citys 去创建响应式对象 citys2 —— 创建失败，因为 citys 被 markRaw 标记了
let citys2 = reactive(citys)

console.log(isReactive(person))     // true
console.log(isReactive(rawPerson))  // false
console.log(isReactive(citys))      // false
console.log(isReactive(citys2))     // false
```


## readonly 与 shallowReadonly

作用：对特定数据进行保护。

- `readonly` 用于创建一个对象的深只读副本；
- `shallowReadonly` 与 `readonly` 类似，但只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的；
- `readonly` 与 `shallowReadonly` 可以对 `ref` 和 `reactive` 定义的响应式数据进行包裹。

```ts
import { reactive, readonly } from 'vue';

const lisi = reactive({ name: '李四' });
const lisiCopy = readonly(lisi);

const changeLisi = () => {
  lisi.name = '李四123';
  // lisiCopy 本无法修改，因为它是只读的
  // 但这个方法中也修改了 lisi，lisi 是响应式的，导致 lisiCopy 的修改也会体现在视图上
  lisiCopy.name = '李四123';
}
```

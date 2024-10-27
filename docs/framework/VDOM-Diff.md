# 虚拟 DOM 与 Diff 算法

## 对比原生 JS 与 React/Vue 渲染数据到页面

现有以下人员列表要渲染到页面。

```js
const personArr = [
  { id: '001', name: '张三', age: 18 },
  { id: '002', name: '李四', age: 19 },
]
```

### 原生 JS 渲染

```js
let htmlStr = ''

personArr.forEach(person => {
  htmlStr += `<li>${person.name}-${person.age}</li>`
})

// 操作DOM，将数据呈现到页面
document.getElementById('list').innerHTML = htmlStr
```

原生 JS 是直接操作 DOM，将数据渲染到页面。

这存在的问题是：

- 当需要重新渲染数据时，都要重新生成 HTML 字符串，然后再操作 DOM，效率较低。
- 当数据发生改变时，页面上已经存在的 DOM 没有被复用，而是会生成新的 DOM，去替换页面上原有的 DOM，导致页面上已经存在的元素又被重新渲染，影响页面性能。

### React/Vue 渲染

1. React/Vue 拿到数据后，会根据数据生成“虚拟 DOM”，再根据“虚拟 DOM”生成“真实 DOM”。
2. 当数据发生变化，React/Vue 会根据新的数据生成新的“虚拟 DOM”，然后拿着新的“虚拟 DOM”去和旧的“虚拟 DOM”使用“DOM Diff 算法”作对比，相同的部分就直接复用页面上已经存在的“真实 DOM”，不同的部分才会生成新的“真实 DOM”。

这样一来，页面上已经存在的元素就不会被再次渲染，只渲染新添加的元素（最小化地重绘页面），大大提高了页面性能。

这也是 React/Vue 高效的原因之一。

## 验证 Diffing 算法

通过以下示例，来验证 Diffing 算法是否存在。

```jsx
class Time extends React.Component {
  state = { date: new Date() }

  componentDidMount() {
    setInterval(() => {
      this.setState({ date: new Date() })
    }, 1000)
  }

  render() {
    const { date } = this.state
    return (
      <div>
        <h1>hello</h1>
        <input type="text" />
        <div>
          现在是：{date.toTimeString()}
          <input type="text" />
        </div>
      </div>
    )
  }
}
```

以上示例，每秒钟都会设置状态中的 `date`，因此每秒钟都会触发 `render`，重新渲染页面。

但并不是页面上所有的元素都会被重新渲染，比如 h1 和两个 input 就没有被重新渲染。

这是由于 DOM Diffing 算法的存在，React 通过 Diffing 算法可以计算出页面上哪些元素发生了改变需要重新渲染，哪些元素没有发生改变不需要重新渲染，以此提高渲染速度和页面性能。

渲染的最小单位是标签（节点），以上示例，div 中的内容发生了变化，那么整个 div 标签都会被重新渲染。

但是，div 中的 input 却没有被重新渲染，这是因为，Diffing 算法会递归地去检查节点中的子节点，只有发生了变化的子节点才会被重新渲染，未发生变化的子节点不会被重新渲染。

## 什么是虚拟 DOM

虚拟 DOM（Virtual DOM）是一种编程概念，它本质上就是一个 JS 对象，使用 JS 对象来描述真实 DOM 节点信息。

- “真实 DOM”指的是页面上已经存在的 DOM 元素，“虚拟 DOM”指的是存在于内存中的对象，它还没有被渲染到页面上。
- ”真实 DOM“身上往往存在非常多的属性，而”虚拟 DOM“只需要存储”真实 DOM“的一些必要属性，如标签名、标签属性、子元素等，够 React/Vue 使用即可。
- ”虚拟 DOM“最终会被 React/Vue 转换成”真实 DOM“，并渲染到页面上。

## 什么是 Diff 算法？

Diff 算法（Differential algorithm）是一种比较两个树的算法，它通过计算两个树的不同，然后将不同的部分应用到真实 DOM 上，从而更新 DOM 树。

Diff 算法的主要思想是：如果两个树的结构相同，则只需要更新变化的部分，而不是重新渲染整个树。

## 虚拟 DOM 的优势

1. 更高的性能：虚拟 DOM 使得对 DOM 的更新更加高效，因为它只更新变化的部分，而不是重新渲染整个树。
2. 更好的可测试性：虚拟 DOM 使得测试更加容易，因为它可以让我们对渲染结果进行断言。
3. 更好的可维护性：虚拟 DOM 使得代码更加可维护，因为它可以让我们把关注点集中在数据的变化上。

## 虚拟 DOM 的实现

虚拟 DOM 的实现有很多种方式，这里我们以 React 为例，来看看如何实现虚拟 DOM。

React 的虚拟 DOM 实现主要有以下几步：

1. 创建虚拟 DOM 对象：React 通过 JSX 语法来创建虚拟 DOM 对象。
2. 计算虚拟 DOM 树：React 通过递归算法来计算虚拟 DOM 树。
3. 应用变更：React 通过 Diff 算法来比较两个虚拟 DOM 树的不同，然后应用变更到真实 DOM 上。

## 总结

虚拟 DOM 与 Diff 算法是 React 实现的核心技术。通过虚拟 DOM，React 可以高效地更新 DOM 树，提高性能；通过 Diff 算法，React 可以高效地更新变化的部分，提高渲染效率。

## key 的作用（面试题）

- 问法1：React、Vue 中的 key 有什么作用？
- 问法2：key 的内部原理是什么？
- 问法3：为什么遍历列表时，key 最好不要用 index？

1. 虚拟 DOM 中 key 的作用：

   key 是虚拟 DOM 中对象的标识，当状态数据发生变化时，React/Vue 会根据【新数据】生成【新的虚拟DOM】，随后进行【新虚拟DOM】与【旧虚拟DOM】的 diff（差异）比较，比较规则如下：

   - 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key：
     - 若虚拟 DOM 中内容没变，直接复用之前的真实 DOM。
     - 若虚拟 DOM 中内容变了，则生成新的真实 DOM，替换掉页面中之前的真实 DOM。
   - 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key，则生成新的真实 DOM 渲染到到页面。

2. 用 index 作为 key 可能会引发的问题：

   - 若对数据进行逆序添加、逆序删除等破坏顺序操作，会产生没有必要的真实 DOM 更新（界面效果没问题，但效率低）。
   - 如果结构中还包含输入类的 DOM，会产生错误 DOM 更新（界面有问题）。

3. 开发中如何选择 key：

   - 对于列表渲染，最好使用每条数据的唯一标识作为 key，比如 id、手机号、身份证号等唯一值。
   - 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。

## 使用 index 和 id 作为 key 的区别

```text title="使用 index 作为 key"
// 初始数据
{ id: 1, name: '小张', age: 18 },
{ id: 2, name: '小李', age: 19 },

// 初始的虚拟 DOM
<li key=0>小张---18</li>
<li key=1>小李---19</li>


// 更新后的数据
{ id: 3, name: '小王', age: 20 },
{ id: 1, name: '小张', age: 18 },
{ id: 2, name: '小李', age: 19 },

// 更新数据后的虚拟 DOM
<li key=0>小王---20</li>
<li key=1>小张---18</li>
<li key=2>小李---19</li>
```

```text title="使用 id 作为 key"
// 初始数据
{ id: 1, name: '小张', age: 18 },
{ id: 2, name: '小李', age: 19 },

// 初始的虚拟 DOM
<li key=1>小张---18</li>
<li key=2>小李---19</li>


// 更新后的数据
{ id: 3, name: '小王', age: 20 },
{ id: 1, name: '小张', age: 18 },
{ id: 2, name: '小李', age: 19 },

// 更新数据后的虚拟 DOM
<li key=3>小王---20</li>
<li key=1>小张---18</li>
<li key=2>小李---19</li>
```

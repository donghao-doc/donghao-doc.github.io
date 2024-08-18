---
sidebar_position: 2
---

# React 组件

安装插件：React Developer Tools。

## 基本理解和使用

### 函数组件

```jsx
// 创建函数式组件
function MyComponent() {
  console.log(this)   // undefined
  return <h1>用函数定义的组件</h1>
}

// 渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById('app'))
```

:::caution
- 函数（组件）名首字母要大写，且函数必须要有返回值。
- 渲染组件时必须写组件标签且必须闭合，不能只写组件（函数）的名字。
:::

**函数组件中的 this**

函数式组件中的 `this` 本来指向 `window`，但代码经过 Babel 编译后，开启了严格模式，所以 `this` 就不再指向 `window`，而是 `undefined`。

**React 做了什么**

执行 `ReactDOM.render(<MyComponent />, document.getElementById('app'))` 时：
1. React 解析组件标签，找到 MyComponent 组件。
2. 发现组件是用函数定义的，就调用该函数，将返回的虚拟 DOM 转为真实 DOM，渲染到页面中。

### 类组件

```jsx
// 创建类式组件
// 1. 必须继承 React.Component
class MyComponent extends React.Component {
  // 2. render 是必须写的
  //    render 函数在 MyComponent 的原型对象上，供实例对象使用
  render() {
    console.log(this)   // render 中的 this 指向 MyComponent 实例对象（组件实例对象）
    // 3. render 函数中的 return 是必须的
    return <h1>用类定义的组件</h1>
  }
}

console.log(MyComponent.prototype)

// 渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById('app'))
```

**console.log(this)**

MyComponent 组件没有写 `constructor` 构造器，组件实例对象身上的 `context`、`props`、`refs`、`state` 等属性，都是从 `React.Component` 继承过来的。

![class_component_this](images/class_component_this.png)

**console.log(MyComponent.prototype)**

`render` 函数在组件的原型对象上，供实例对象使用。

![class_component_render](images/class_component_render.png)

**React 做了什么**

执行 `ReactDOM.render(<MyComponent />, document.getElementById('app'))` 时：
1. React 解析组件标签，找到 MyComponent 组件。
2. 发现组件是使用类定义的，就 new 出来该类的实例（实例是通过执行类内部的 `constructor` 得到的），并通过实例对象调用原型上的 `render` 方法。
3. 将 `render` 方法返回的虚拟 DOM 转为真实 DOM，渲染在页面上。

## 组件三大核心属性：state

### 基本使用

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isHot: true }
  }

  // demo 方法在 Weather 类的原型对象上，供实例使用
  // 通过 Weather 实例对象调用 demo 时，demo 中的 this 就是 Weather 的实例对象
  demo() {
    console.log('111111')
  }

  render() {
    const { isHot } = this.state
    // 给元素添加 onClick 属性，绑定事件
    // this.demo 后面如果直接加上 ()，会直接调用 demo 函数
    return <h1 onClick={this.demo}>今天天气很{isHot ? '炎热' : '凉爽'}</h1>
  }
}
```

### this 指向问题

组件中的 `constructor` 和 `render` 方法中的 `this`，指向的都是组件实例对象。
- `constructor` 中的 `this` 指向的一定是实例对象。
- `render` 中的 `this` 指向组件实例对象是因为 React 发现组件是用类定义的，就帮我们 new 了该类，得到了该类的实例对象。

但组件中的自定义方法中的 `this`，指向的不是组件的实例对象，而是 `undefined`。

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isHot: true }
  }

  // changeWeather 方法在 Weather 类的原型对象上，供实例使用
  // 通过 Weather 实例对象调用 changeWeather 时，changeWeather 中的 this 就是 Weather 实例对象
  // 但是此处，changeWeather 是作为 onClick 的回调直接调用的，而不是通过实例调用的
  // 相当于 changeWeather()，即：changeWeather.call(undefined)
  // 所以在浏览器中，this 指向 window
  // 又因为类中的方法默认开启了局部的严格模式，所以 this 就成了 undefined（与 Babel 无关）
  changeWeather() {
    console.log(this)   // undefined
  }

  render() {
    const { isHot } = this.state
    return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h1>
  }
}
```

### 解决 this 指向问题

通过在 `constructor` 中手动地给自定义方法绑定 `this`，就可以将自定义方法中的 `this` 强制指定为类的实例对象。

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isHot: true }
    // 通过 bind 方法手动给 changeWeather 方法绑定 this
    // bind 会返回新的函数，并且指定 this
    // 所以 this.changeWeather 就是一个新的函数，并且该函数的 this 是组件实例对象
    // 以此解决自定义函数中的 this 指向问题
    this.changeWeather = this.changeWeather.bind(this)
  }

  changeWeather() {
    console.log(this)   // Weather 实例对象
  }

  render() {
    const { isHot } = this.state
    return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h1>
  }
}
```

以上代码，会生成两个 `changeWeather` 方法，其中自定义的 `changeWeather` 方法在类的原型对象上，`constructor` 中通过 `bind` 新生成的 `changeWeather` 方法在类的实例对象上。

![changeWeather_bind](images/changeWeather_bind.png)

:::tip 总结
自定义方法在类的原型对象上，只有 new 这个类，通过类的实例对象去调用原型对象上的自定义方法，自定义方法中的 `this` 才是类的实例对象。

但通常，我们调用自定义方法不是通过实例对象调用的，而是作为事件的回调函数调用，所以会导致自定义方法中的 `this` 指向 `undefined` 的问题。

解决方法：
- 在 `constructor` 中通过函数对象的 `bind` 方法强制绑定 `this`。
- 使用“赋值语句 + 箭头函数”的形式。
:::

### setState

状态不可直接更改，直接修改 `state` 中的数据，数据只会在内存中发生变化，而不会触发组件的重新渲染。

`React.Component` 类的原型上有个 `setState` 方法，用于修改 `state` 中的数据。

`setState` 方法修改数据后，会引起组件的重新渲染。

`setState` 方法要求传入一个对象，React 会拿着这个对象去与 `state` 对象做合并，而不是直接替换 `state` 对象。

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isHot: true }
    this.changeWeather = this.changeWeather.bind(this)
  }

  changeWeather() {
    const { isHot } = this.state
    // 正确做法：通过从 React.Component 继承来的 setState 方法修改 state
    this.setState({ isHot: !isHot })

    // 错误做法：直接修改 state 中的数据
    // this.state.isHot = !isHot
  }

  render() {
    const { isHot } = this.state
    return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h1>
  }
}
```

### 简写形式

类中可以写赋值语句，可以将属性或方法直接定义在实例对象自身。

这么做的好处是，可以省去构造器中的 `this` 的绑定，直接调用实例对象上的方法。

```jsx
class Weather extends React.Component {
  // state 会出现在实例对象自身
  state = { isHot: true }
  
  // changeWeather 也会在实例对象自身，而不在类的原型上
  // 注意，这里必须是箭头函数，不能是普通函数，否则 this 会丢失
  changeWeather = () => {
    console.log(this)   // Weather 实例对象
    const { isHot } = this.state
    this.setState({ isHot: !isHot })
  }
  
  render() {
    const { isHot } = this.state
    return (
      <h1 onClick={this.changeWeather}>
        今天天气很{isHot ? '炎热' : '凉爽'}
      </h1>
    )
  }
}
```

### 构造器与 render 方法会被调用几次

`constructor` 调用 1 次，`render` 调用 1 + n 次。
- React 在 new 组件类时，通过调用 `constructor`，生成组件实例对象，所以 `constructor` 会在初始化时调用 1 次。
- React 初次渲染页面时，通过组件实例对象调用 `render` 方法，所以 `render` 会在初始化时调用 1 次；当组件状态更新时会再次调用 `render`，重新渲染页面（只要状态发生变化，`render` 就会重新调用，从而更新页面）。

## 组件三大核心属性：props

## 组件三大核心属性：refs 与 事件

## 收集表单数据

## 组件生命周期

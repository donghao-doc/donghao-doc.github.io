---
sidebar_position: 10
title: Context、HOC、跨域
---

## Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

使用步骤：

1. 创建需要传递的数据 `React.Context()` 实例，括号里存放默认初始数据。

    ```jsx
    import React from 'react'
    const MyContext = React.createContext('')
    export default MyContext
    ```

2. 父组件提供 Context 数据。

    ```jsx
    import React from 'react'
    import MyContext from './context'
    import GrandChild from './GrandChild'

    class App extends React.PureComponent {
      state = {
        msg: '⽗组件数据'
      }

      render() {
        return (
          <div>
            <MyContext.Provider value={this.state.msg}>
              <h1>⽗组件</h1>
              <GrandChild a={this.state.msg} />
            </MyContext.Provider>
          </div>
        )
      }
    }

    export default App
    ```

3. 后代组件使用 Context 数据。

    ```jsx title="方式 1：使用 Consumer"
    function GrandChild() {
      return (
        <MyContext.Consumer>
          {value => (
            <>
              <h1>后代组件 {value}</h1>
            </>
          )}
        </MyContext.Consumer>
      )
    }
    ```

    ```jsx title="方式 2：使用 contextType"
    import React from 'react'
    import MyContext from './context'

    // 把 Context 数据挂载到 Class.contextType 属性上，就可以在类中使用 this.context 访问 Context 数据

    class GrandChild extends React.Component {
      static contextType = MyContext

      render() {
        return <h1>后代组件 {this.context}</h1>
      }
    }

    // 或者
    GrandChild.contextType = MyContext

    export default GrandChild
    ```

## HOC

### 基本概念

高阶组件（Higher-Order Component，简称 HOC）是 React 中用于复用组件逻辑的一种高级技术。

本质上，高阶组件是一个函数，它接收一个组件作为参数，返回一个新的组件。它主要用于逻辑的共享和重用，而不是直接渲染 UI。

这种模式类似于 JavaScript 中的高阶函数，即接收一个函数作为参数，返回一个新函数。

:::caution
- HOC 应当是纯函数，无副作用。
- 不要在 HOC 内部修改原始组件，而是要返回一个新组件。
- 高阶组件的命名一般以“with”开头，表示它是为组件提供附加功能的。
:::

```jsx
import React from 'react'

class Demo extends React.Component {
  render() {
    return <h1>Demo 组件</h1>
  }
}

// 高阶组件
function withLog(WrapComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('挂载了')
    }
    render() {
      return <WrapComponent {...this.props} />
    }
  }
}

const NewDemo = withLog(Demo)

export default NewDemo
```

```jsx
import React from 'react'
import NewDemo from './NewDemo'

class App extends React.Component {
  state = {
    msg: 'App 组件数据'
  }
  render() {
    return <NewDemo msg={this.state.msg} />
  }
}
```

### 使用

```jsx
import React from 'react'
import axios from 'axios'

class MyDog extends React.Component {
  render() {
    return (
      <>
        <img src={this.props.url} width="200" />
        <h1>我是⼀只狗</h1>
      </>
    )
  }
}

class MyCat extends React.Component {
  render() {
    return (
      <>
        <img src={this.props.url} width="200" />
        <h1>我是⼀只猫</h1>
      </>
    )
  }
}

function withAnimal(WrapComponent, url, type) {
  return class extends React.Component {
    state = {
      data: ''
    }

    getData = () => {
      axios.get(url).then(res => {
        console.log(res)
        this.setState({
          data: type == 1 ? res.data.message : res.data[0].url
        })
      })
    }

    componentDidMount() {
      this.getData()
    }

    render() {
      return <WrapComponent url={this.state.data} {...this.props} />
    }
  }
}

const Dog = withAnimal(MyDog, 'https://dog.ceo/api/breeds/image/random', 1)
const Cat = withAnimal(MyCat, 'https://api.thecatapi.com/v1/images/search', 2)

class App extends React.Component {
  render() {
    return (
      <div>
        <Dog />
        <Cat />
      </div>
    )
  }
}

export default App
```

## 跨域问题的解决

### 单个代理

```json title="package.json"
{
  "name": "react-app",
  "proxy": "https://api.binstd.com"
}
```

```jsx title="App.js"
const getData = () => {
  axios.get('http://localhost:3000/recipe/search', {
    params: {
      appkey: '1234567890',
      keyword: '鱼香肉丝',
      num: 10
    }
  }).then(res => {
    console.log(res)
  })
}
```

### 多个代理

```js title="src/setupProxy.js"
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://api.binstd.com', // 跨域地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
```

:::tip
- 无需在任何位置导入 `setupProxy.js` 文件，它会在启动开发服务器时自动注册。
- 文件名必须是 `setupProxy.js`，不能更改。
:::

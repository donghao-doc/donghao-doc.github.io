# useId

`useId` 用于生成唯一的 ID 字符串，这个 ID 在服务端渲染（SSR）和客户端渲染中保持⼀致，帮助解决客户端和服务器之间的 ID 不匹配问题。

:::warning

不要使⽤ `useId` 来⽣成列表中的 key，key 应该由你的数据⽣成。

:::

```tsx
import React, { useId } from "react";

function App() {
  let a = useId();
  
  return (
    <div>
      <label htmlFor={a}>请输⼊你的名字</label>
      <input type="text" id={a} />
    </div>
  );
}
```

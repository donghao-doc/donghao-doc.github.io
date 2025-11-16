# PixiJS

PixiJS 是一个超快的 2D **渲染引擎**，它拥有强大的图片渲染能力和场景图技术，可用于制作动画、炫酷的交互、简单的小游戏等。

:::warning
PixiJS 不是游戏引擎。
:::

[中文教程](https://pixijs.huashengweilai.com/guide/start/1.introduction.html) |
[官方文档](https://pixijs.download/v7.x/docs/index.html) |
[官方示例](https://pixijs.com/7.x/examples) |
[Vue3 Pixi](https://www.npmjs.com/package/vue3-pixi?activeTab=readme)

实际案例：https://github.com/donghao-doc/pixi-examples

:::code-group

```bash [安装]
npm install pixi.js
```

```ts [使用]
import * as PIXI from 'pixi.js';
```

:::

## 最简单的流程

显示图片到页面：

1. 创建**舞台**，将舞台添加到页面。
2. 使用**加载器**，加载图像到**纹理缓存**。
3. 以纹理创建**精灵**，将精灵添加到舞台。
4. **操作精灵**的位置、大小、旋转、缩放等。

## 舞台（stage）

舞台是一个**根容器**对象，任何要用 Pixi 显示的东西都要添加到舞台上。

```ts
// 创建 Pixi 应用（舞台）
const app = new PIXI.Application({
  width: 256, // default: 800 宽度，单位 px
  height: 256, // default: 600 高度，单位 px
  antialias: true, // default: false 反锯齿，可以让字体和图形边缘更平滑
  transparent: false, // default: false 透明度，使 canvas 背景透明
  resolution: 1, // default: 1 分辨率，让图形在不同分辨率和像素密度下有较好的展示
});

// 把舞台添加到 body 中
document.body.appendChild(app.view);
```

`PIXI.Application` 会在页面上创建 canvas 元素，并且会自动选择使用 Canvas 模式或 WebGL 模式来渲染图形，这取决于浏览器支持哪一种方式。

它会优先使用 WebGL 模式，如果要强制使用 Canvas 模式，可以在配置对象中设置 `forceCanvas: true`。

## 加载器（loader）

Pixi 的加载器可以加载图片、字体、音视频、JSON（纹理贴图集）等资源，并将其转化为纹理。

```ts
PIXI.loader
  .add('images/anyImage.png')
  .add(['images/image1.png', 'images/image2.png', 'images/image3.png'])
  .load(setup);

// 当资源加载完成时执行此回调
function setup() {
  console.log('加载完成');
}
```

通过 `progress` 事件，还可以监控加载进度。

```ts
PIXI.loader
  .add(['images/one.png', 'images/two.png', 'images/three.png'])
  .on('progress', loadProgressHandler)
  .load(setup);

// 每加载一个资源，都会执行此回调
function loadProgressHandler(loader, resource) {
  // resource.url 可以知道哪个资源被加载了
  console.log('loading: ' + resource.url);
  // loader.progress 可以知道整体的加载进度
  console.log('progress: ' + loader.progress + '%');
}

// 当所有资源加载完毕，就会执行此回调
function setup() {
  console.log('setup');
}
```

## 纹理（texture）

纹理：因为 Pixi 使用 WebGL 在 GPU 上渲染图像，图像需要转换为 GPU 可处理的东西，这个东西就是纹理。

纹理缓存：Pixi 的加载器加载资源时，会自动将其转化为纹理，并将纹理自动缓存下来。

纹理缓存的好处：

- 一是避免重复加载。
- 二是创建精灵时，可以直接从缓存中获取纹理，提高效率。

## 精灵（sprite）

精灵就是要添加到舞台上的**可视化对象**，通常用于显示图像（普通精灵）或动画（动画精灵）。

### 显示精灵

要在舞台上显示精灵，需要将精灵添加到舞台中。

```ts
// 创建 Pixi 应用（舞台）
const app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
});

// 将舞台添加到页面
document.body.appendChild(app.view);

// 加载图片资源
PIXI.loader.add('images/cat.png').load(setup);

function setup() {
  // 获取纹理
  const catTexture = PIXI.loader.resources['images/cat.png'].texture;
  // 创建精灵
  const catSprite = new PIXI.Sprite(catTexture);
  // 把精灵添加到舞台
  app.stage.addChild(catSprite);
}
```

### 改变精灵的外观

通过改变精灵的纹理，可以改变精灵的外观。

```ts
anySprite.texture = PIXI.utils.TextureCache['anyTexture.png'];
```

### 位置、大小、缩放、旋转

:::code-group

```ts [设置精灵位置]
// 坐标系以舞台左上角为原点 (0, 0)
sprite.x = 96;
sprite.y = 96;

// 或者
sprite.position.set(x, y);
```

```ts [设置精灵大小]
sprite.width = 80;
sprite.height = 120;
```

```ts [设置精灵缩放]
sprite.scale.x = 0.5;
sprite.scale.y = 0.5;

// 或者
sprite.scale.set(0.5, 0.5);
```

```ts [设置精灵旋转]
sprite.rotation = 0.5;
```

:::

### 锚点

精灵默认围绕着锚点进行旋转，锚点的位置默认为 `(0, 0)`，即精灵的左上角。

也可以改变锚点的位置，让精灵围绕着中心进行旋转。

```ts
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

// 或者
cat.anchor.set(x, y);
```

### 移动精灵

使用 Pixi 提供的 `ticker` 创建一个函数，这个函数每秒会被执行 60 次。

如以下代码，将精灵以每帧 1px 的速度向右移动。

```ts
function setup() {
  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
  sprite.x += 1;
}
```

### delta

`delta` 是 Pixi 提供的一个参数，表示帧与帧之间的平均时间间隔，以秒为单位，是一个浮点数，用于让动画在不同帧率的设备上表现一致。

理解：

- 比如有两台设备，好设备从一帧到下一帧时间间隔是 1s，差设备时间间隔是 2s。
- 动画效果是每帧移动 1px，当时间过去 10s，好设备切换了 10 帧，动画移动了 10x，差设备只切换了5帧，动画只移动了 5px，形成动画效果的差异。
- 而 `delta` 表示帧与帧之间的平均时间间隔，在好设备上 `delta` 值为 1，差设备上 `delta` 值为 2。
- 将以上代码改写为 `sprite.x += 1 * delta`，好设备上每帧移动 1px，差设备上每帧移动 2px，拿距离换时间，弥补差距，从而实现动画效果表现一致。

:::warning
如果 `delta` 值过大，可能会导致动画跳跃、不连贯，某些情况下可能需要限制 `delta` 的最大值。
:::

:::tip
`delta` 只是让动画效果在视觉上保持一致，一般来说可以不使用 `delta`。
:::

## 容器（container）

容器可理解为一个盒子，可以把多个精灵添加到一个容器中，从而实现对精灵的分组。

```ts
// 创建容器
const animalsContainer = new PIXI.Container();

// 往容器中添加精灵
animalsContainer.addChild(catSprite);
animalsContainer.addChild(dogSprite);
animalsContainer.addChild(tigerSprite);

// 将容器添加到舞台
app.stage.addChild(animalsContainer);
```

可以像操作精灵那样操作容器，如控制容器的位置、大小、缩放等，容器中的精灵也会随之改变。

:::warning
一个精灵只能拥有一个父级。如果一个精灵在 A 容器，又将该精灵添加到 B 容器，该精灵会自动从 A 容器移除。
:::

## 图形绘制（Graphics）

Pixi 的绘制图形的 API 与 Canvas API 类似，不同的是，Pixi 中绘制图形都要从创建一个 `PIXI.Graphics` 实例开始。

:::code-group

```ts [绘制矩形]
const rectangle = new PIXI.Graphics();

rectangle.lineStyle(4, 0xff3300, 1);
rectangle.beginFill(0x66ccff);
rectangle.drawRect(0, 0, 64, 64); // x, y, width, height
rectangle.endFill();

rectangle.x = 170;
rectangle.y = 170;

app.stage.addChild(rectangle);
```

```ts [绘制圆形]
const circle = new PIXI.Graphics();

circle.beginFill(0x9966ff);
circle.drawCircle(0, 0, 32); // x, y, radius
circle.endFill();

circle.x = 64;
circle.y = 130;

app.stage.addChild(circle);
```

```ts [绘制线]
const line = new PIXI.Graphics();

line.lineStyle(4, 0xffffff, 1);
line.moveTo(0, 0);
line.lineTo(80, 50);

line.x = 32;
line.y = 32;

app.stage.addChild(line);
```

:::

除此之外，还可以绘制椭圆、圆角矩形、多边形等图形。

## 绘制文字（Text）

Pixi 的 `Text` 对象继承自 `Sprite` 类，因此文字可以使用精灵的全部属性。

```ts
// 设置文字样式
const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fill: 'white',
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

// 创建文字
const message = new PIXI.Text('Hello Pixi!', style);

// 文字可以使用精灵的全部属性
message.position.set(54, 96);
```

## 事件（interactive）

Pixi 支持鼠标事件、触摸事件、键盘事件等等。

要让一个对象支持事件，需要设置 `interactive: true`。

```ts
sprite.interactive = true; // 使精灵可交互

sprite.on('click', () => {
  console.log('Sprite clicked!');
});
```

# PixiJS

PixiJS 是一个超快的 2D 渲染引擎，它拥有强大的图片渲染能力和场景图技术，可用于制作动画、炫酷的交互、简单的小游戏等。

参考文档：
[中文教程](https://pixijs.huashengweilai.com/guide/start/1.introduction.html) |
[官方文档](https://pixijs.download/v7.x/docs/index.html) |
[官方示例](https://pixijs.com/7.x/examples)

组件式：
[Vue 3 Pixi Renderer](https://www.npmjs.com/package/vue3-pixi?activeTab=readme)

工作案例：
[GitHub](https://github.com/donghao-doc/pixi-examples) |
[Gitee](https://gitee.com/barrydong/pixi-examples)

## 最简单的流程

显示图片到页面：

1. 创建舞台，将舞台添加到页面
2. 使用加载器，加载图片到纹理缓存
3. 以纹理创建精灵，将精灵添加到舞台
4. 操作精灵的位置、大小、缩放、旋转等

## 舞台（stage）

舞台是一个根容器对象，任何要用 Pixi 显示的东西都要添加到舞台上。

```js
// 创建 Pixi 应用（舞台）
let app = new PIXI.Application({
  width: 256,         // 默认 800px
  height: 256,        // 默认 600px
  antialias: true,    // 反锯齿，可以让字体和图形边缘更平滑，默认 false
  transparent: false, // 透明度，使 canvas 背景透明，默认 false
  resolution: 1       // 分辨率，让图形在不同分辨率和像素密度下有较好的展示，默认 1
});

// 把舞台添加到 body 中
document.body.appendChild(app.view);
```

`PIXI.Application` 会在页面上创建 canvas 元素，并且会自动选择使用 Canvas 模式或 WebGL 模式来渲染图形，这取决的浏览器支持哪一种方式。

它会优先使用 WebGL 模式，如果要强制使用 Canvas 模式，可以在配置对象中设置 `forceCanvas: true`。

## 加载器（loader）

Pixi 的加载器可以加载图片、字体、音视频、JSON（纹理贴图集）等资源，并将其转化为纹理。

```js
PIXI.loader
  // 加载单个资源
  .add("images/anyImage.png")
  // 加载多个资源
  .add(["images/image1.png", "images/image2.png", "images/image3.png"])
  // 加载完毕后执行回调
  .load(setup);

// 当资源加载完成时执行此回调
function setup() {
  console.log('加载完成')
}
```

通过 `progress` 事件，还可以监控加载进度。

```js
PIXI.loader
  .add(["images/one.png", "images/two.png", "images/three.png"])
  .on("progress", loadProgressHandler)
  .load(setup);

// 每加载一个资源，都会执行此回调
function loadProgressHandler(loader, resource) {
  // resource.url 可以知道哪个资源被加载了
  console.log("loading: " + resource.url); 
  // loader.progress 可以知道整体的加载进度
  console.log("progress: " + loader.progress + "%"); 
}

// 当所有资源加载完毕，就会执行此回调
function setup() {
  console.log("加载完成");
}
```

## 纹理（texture）

> 官方说法：因为 Pixi 使用 WebGL 在 GPU 上渲染图像，图像需要转换为 GPU 可处理的东西，这个东西就是纹理。

理解：创建一个精灵所需要的资源，比如要展示图片，纹理就是图片的二进制数据、像素数据。

### 纹理缓存

使用 Pixi 加载器加载资源时，会自动将其转化为纹理，并将纹理缓存下来。

纹理缓存的好处：

- 避免重复加载
- 创建精灵时，可以直接从缓存中获取纹理，提高效率

## 精灵（sprite）

精灵就是我们要添加到舞台上的可视化对象（如图片、文字、图形等）。

### 显示精灵

要在舞台上显示精灵，需要将精灵添加到舞台中。

```js
// 创建 Pixi 应用（舞台）
const app = new PIXI.Application({ 
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1
});

// 将舞台添加到页面
document.body.appendChild(app.view);

// 加载图片资源
PIXI.loader
  .add("images/cat.png")
  .load(setup);

// 资源加载完毕会触发此回调
function setup() {
  // 获取纹理
  const catTexture = PIXI.loader.resources["images/cat.png"].texture;
  // 创建精灵
  const catSprite = new PIXI.Sprite(catTexture);
  // 把精灵添加到舞台
  app.stage.addChild(catSprite);
}
```

### 改变精灵的外观

通过改变精灵的纹理，可以改变精灵的外观。如：游戏人物衣着、饰品、武器等的变化。

```js
anySprite.texture = PIXI.utils.TextureCache["anyTexture.png"];
```

### 设置精灵位置

坐标系以舞台左上角为原点 `(0, 0)`。

```js
sprite.x = 96;
sprite.y = 96;

// 或者
sprite.position.set(x, y);
```

### 设置精灵大小

```js
sprite.width = 80;
sprite.height = 120;
```

### 设置精灵缩放

```js
sprite.scale.x = 0.5;
sprite.scale.y = 0.5;

// 或者
sprite.scale.set(0.5, 0.5);
```

### 设置精灵旋转

```js
sprite.rotation = 0.5;
```

精灵默认围绕着锚点进行旋转，锚点的位置默认为 `(0, 0)`，即精灵的左上角。

```js
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

// 或者
cat.anchor.set(x, y);
```

## 动画精灵（AnimatedSprite）

动画精灵是精灵的子类，它具有精灵的所有属性，并且可以播放动画。常用于播放序列帧动画，比如人物行走、技能特效等。

### 创建动画精灵

动画精灵需要一个纹理数组来创建，每个纹理代表动画中的一帧。

:::code-group

```js [从纹理数组创建动画精灵]
// 纹理数组，每个纹理代表动画中的一帧
const textures = [
  PIXI.Texture.from('frame1.png'),
  PIXI.Texture.from('frame2.png'),
  PIXI.Texture.from('frame3.png')
];

// 创建动画精灵
const animatedSprite = new PIXI.AnimatedSprite(textures);
```

```js [从精灵表创建动画精灵]
// 精灵表数据，通常是 JSON 格式
const atlasData = {
  frames: {
    enemy1: {
      frame: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
    enemy2: {
      frame: { x: 32, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 },
    },
  },
  meta: {
    image: 'images/spritesheet.png',
    format: 'RGBA8888',
    size: { w: 128, h: 32 },
    scale: 1,
  },
  animations: {
    enemy: ['enemy1', 'enemy2'], // 动画帧名称数组
  },
};

// 创建精灵表
const spritesheet = new PIXI.Spritesheet(
  PIXI.BaseTexture.from(atlasData.meta.image), 
  atlasData
);

// 解析精灵表
await spritesheet.parse();

// 创建动画精灵
const animatedSprite = new PIXI.AnimatedSprite(spritesheet.animations.enemy);
```

:::

### 动画精灵属性设置

```js
// 设置动画速度（0-1之间，数值越大播放越快）
animatedSprite.animationSpeed = 0.1;

// 设置是否循环播放
animatedSprite.loop = true;

// 设置缩放
animatedSprite.scale.set(0.5);

// 设置位置
animatedSprite.position.set(100, 100);

// 设置锚点
animatedSprite.anchor.set(0.5);
```

### 动画播放控制

```js
// 播放动画
animatedSprite.play();

// 停止动画
animatedSprite.stop();

// 跳转到指定帧
animatedSprite.gotoAndPlay(2); // 跳转到第3帧并播放
animatedSprite.gotoAndStop(0); // 跳转到第1帧并停止

// 检查动画是否正在播放
if (animatedSprite.playing) {
  console.log('动画正在播放');
}
```

### 动画事件监听

```js
// 监听动画完成事件
animatedSprite.onComplete = () => {
  console.log('动画播放完成');
};

// 监听动画循环事件
animatedSprite.onLoop = () => {
  console.log('动画循环一次');
};

// 监听帧变化事件
animatedSprite.onFrameChange = (currentFrame) => {
  console.log('当前帧：', currentFrame);
};
```

### 动画精灵的实际应用

```js
// 人物状态动画管理
class Character {
  constructor() {
    this.idleTextures = [/* 待机动画纹理 */];
    this.walkTextures = [/* 行走动画纹理 */];
    this.runTextures = [/* 跑步动画纹理 */];
    
    this.idleAnimation = createAnimationSprite(this.idleTextures, 0.05);
    this.walkAnimation = createAnimationSprite(this.walkTextures, 0.1);
    this.runAnimation = createAnimationSprite(this.runTextures, 0.2);
    
    this.currentAnimation = this.idleAnimation;
    this.currentAnimation.play();
  }
  
  // 切换到行走动画
  walk() {
    if (this.currentAnimation !== this.walkAnimation) {
      this.currentAnimation.stop();
      this.currentAnimation = this.walkAnimation;
      this.currentAnimation.play();
    }
  }
  
  // 切换到待机动画
  idle() {
    if (this.currentAnimation !== this.idleAnimation) {
      this.currentAnimation.stop();
      this.currentAnimation = this.idleAnimation;
      this.currentAnimation.play();
    }
  }
}
```

## 移动精灵（ticker）

使用 Pixi 提供的 `ticker` 创建一个函数，这个函数每秒会被执行 60 次。

如以下代码，将精灵以每帧 1px 的速度向右移动。
```js
// 每秒执行 60 次
function setup() {
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  sprite.x += 1;
}
```

`delta` 表示帧与帧之间的平均时间间隔，以秒为单位，是一个浮点数，用于让动画在不同帧率的设备上表现一致。

理解：

1. 比如有两台设备，好设备从一帧到下一帧时间间隔是 1s，差设备时间间隔是 2s。
2. 动画效果是每帧移动 1px，当时间过去 10s，好设备切换了 10 帧，动画移动了 10px，差设备只切换了 5 帧，动画只移动了 5px，从而造成动画效果的差异。
3. `delta` 表示帧与帧之间的平均时间间隔，在好设备上 `delta` 值为 1，差设备上 `delta` 值为 2。
4. 将上面代码改写为 `sprite.x += 1 * delta`，好设备上每帧移动 1px，差设备上每帧移动 2px，拿距离换时间，弥补差距，从而实现动画效果表现一致。

:::warning

如果 `delta` 值过大，可能会导致动画跳跃、不连贯，某些情况下可能需要限制 `delta` 的最大值。

:::

:::tip

`delta` 只是让动画效果在视觉上保持一致，一般来说可以不使用 `delta`。

:::

## 容器（container）

容器可理解为一个盒子，可以把多个精灵添加到一个容器中，从而实现对精灵的分组。

```js
// 创建容器
let animals = new PIXI.Container();

// 往容器中添加精灵
animals.addChild(cat);
animals.addChild(dog);
animals.addChild(tiger);

// 将容器添加到舞台
app.stage.addChild(animals);
```

可以像操作精灵那样操作容器，如控制容器的位置、大小、缩放等，容器中的精灵也会随之改变。

一个精灵只能拥有一个父级。如果一个精灵在 A 容器，又将该精灵添加到 B 容器，该精灵会自动从 A 容器移除。

## 绘制图形（Graphics）

Pixi 的绘制图形的 API 与 Canvas API 类似，不同的是，Pixi 中绘制图形都要从创建一个 Graphics 实例开始。

:::code-group

```js [矩形]
const rectangle = new Graphics();

// 设置线条样式
rectangle.lineStyle(4, 0xFF3300, 1);

// 设置填充颜色
rectangle.beginFill(0x66CCFF);

// 绘制矩形
rectangle.drawRect(0, 0, 64, 64);

// 结束填充
rectangle.endFill();

// 设置位置
rectangle.x = 170;
rectangle.y = 170;

// 将矩形添加到舞台
app.stage.addChild(rectangle);
```

```js [圆形]
const circle = new Graphics();

// 设置填充颜色
circle.beginFill(0x9966FF);

// 绘制圆形
circle.drawCircle(0, 0, 32);

// 结束填充
circle.endFill();

// 设置位置
circle.x = 64;
circle.y = 130;

// 将圆形添加到舞台
app.stage.addChild(circle);
```

```js [线]
const line = new Graphics();

// 设置线条样式
line.lineStyle(4, 0xFFFFFF, 1);

// 绘制线
line.moveTo(0, 0);
line.lineTo(80, 50);

// 设置位置
line.x = 32;
line.y = 32;

// 将线添加到舞台
app.stage.addChild(line);
```

:::

还可以绘制椭圆、圆角矩形、多边形等其他图形。

## 绘制文字（Text）

Pixi 的 `Text` 对象继承自 `Sprite` 类，因此文字可以使用精灵的全部属性。

```js
// 设置文字样式
let style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

// 创建文字
let message = new PIXI.Text("Hello Pixi!", style);

// 文字可以使用精灵的全部属性
message.position.set(54, 96);
```

## 事件

Pixi 支持鼠标事件、触摸事件、键盘事件等等。

要让一个对象支持事件，需要给对象设置 `interactive: true`。

```js
// 使精灵可交互
sprite.interactive = true;

// 监听点击事件
sprite.on('click', () => {
  console.log('精灵被点击了');
});
```

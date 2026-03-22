# Brittany Chiang v4 暗色主题调研记录

## 背景

本次调研的目标是参考 [Brittany Chiang v4](https://v4.brittanychiang.com/) 的视觉与实现方式，为当前项目建立默认 `dark` 主题的设计基准，并为后续主题切换功能预留清晰的设计与实现边界。

本阶段只做调研，不写业务代码。

## 调研范围

- 线上站点视觉表现
- 桌面端与移动端页面级效果
- GitHub 仓库实现方式
- 可迁移到本项目的暗色主题资产
- 不建议照搬的内容
- 后续主题切换应如何拆分 token

## 信息来源

### 线上站点

- 目标站点: [https://v4.brittanychiang.com/](https://v4.brittanychiang.com/)
- 页面级观察基于本次会话中提供的桌面端与移动端截图

### 代码仓库

- 仓库地址: [https://github.com/bchiang7/v4](https://github.com/bchiang7/v4)
- 关键参考文件:
  - [README.md](https://github.com/bchiang7/v4/blob/main/README.md)
  - [package.json](https://github.com/bchiang7/v4/blob/main/package.json)
  - [src/styles/variables.js](https://github.com/bchiang7/v4/blob/main/src/styles/variables.js)
  - [src/styles/GlobalStyle.js](https://github.com/bchiang7/v4/blob/main/src/styles/GlobalStyle.js)
  - [src/styles/mixins.js](https://github.com/bchiang7/v4/blob/main/src/styles/mixins.js)
  - [src/styles/fonts.js](https://github.com/bchiang7/v4/blob/main/src/styles/fonts.js)
  - [src/components/nav.js](https://github.com/bchiang7/v4/blob/main/src/components/nav.js)
  - [src/components/menu.js](https://github.com/bchiang7/v4/blob/main/src/components/menu.js)
  - [src/components/loader.js](https://github.com/bchiang7/v4/blob/main/src/components/loader.js)
  - [src/components/sections/hero.js](https://github.com/bchiang7/v4/blob/main/src/components/sections/hero.js)
  - [src/components/sections/about.js](https://github.com/bchiang7/v4/blob/main/src/components/sections/about.js)
  - [src/components/sections/jobs.js](https://github.com/bchiang7/v4/blob/main/src/components/sections/jobs.js)
  - [src/components/sections/featured.js](https://github.com/bchiang7/v4/blob/main/src/components/sections/featured.js)
  - [src/components/sections/projects.js](https://github.com/bchiang7/v4/blob/main/src/components/sections/projects.js)
  - [src/components/sections/contact.js](https://github.com/bchiang7/v4/blob/main/src/components/sections/contact.js)
  - [src/config.js](https://github.com/bchiang7/v4/blob/main/src/config.js)
  - [gatsby-config.js](https://github.com/bchiang7/v4/blob/main/gatsby-config.js)

## 调研结论摘要

这个站点最值得参考的不是单一页面样式，而是一套完成度很高的 `dark-first` 设计系统。它的视觉识别来自以下组合：

- 深海军蓝背景，而不是纯黑背景
- 冷灰蓝文本层级，而不是高对比白字满屏
- 单一薄荷绿高亮色，且使用极其克制
- 大留白与强节奏的 section 划分
- 轻量但统一的交互反馈
- 桌面端与移动端都保持一致的气质，而不是简单缩放

对当前项目而言，最适合借鉴的是它的暗色主题语言、层级组织和交互规则，而不是作品集页面结构本身。

## 仓库与技术栈观察

### 技术栈

- `Gatsby 3`
- `React 17`
- `styled-components 5`
- `animejs`
- `scrollreveal`
- `gatsby-plugin-image`

### 判断

- 设计层面值得参考
- 工程实现不建议原样复用
- 主题系统并非为多主题而设计，而是默认写死为 `dark`

### 版本状态

仓库最近一次提交为 `2023-04-25`，属于成熟但偏旧的实现方案。可以借鉴设计结果，不应把这套前端实现直接当作当前项目的技术模板。

## 暗色主题核心设计语言

### 1. 配色系统

README 和 `variables.js` 中明确给出了主色板：

- `#020c1b` dark navy
- `#0a192f` navy
- `#112240` light navy
- `#233554` lightest navy
- `#8892b0` slate
- `#a8b2d1` light slate
- `#ccd6f6` lightest slate
- `#e6f1ff` white
- `#64ffda` green

### 2. 颜色使用规律

- 页面底色使用深海军蓝，而不是绝对黑
- 主要内容文字并不是白色，而是偏蓝灰的低饱和亮色
- 真正高亮的区域只给标题重点和 accent
- 按钮、链接、编号、细节标签共享同一 accent 色
- 卡片、导航、项目描述块通过更浅一级的深色背景构成层级

### 3. 适合当前项目借鉴的颜色逻辑

后续落地到本项目时，不应继续沿用 `navy`、`slate` 这种命名，而应改为语义 token：

- `--bg`
- `--bg-elevated`
- `--bg-overlay`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--border-subtle`
- `--accent`
- `--accent-soft`
- `--shadow-strong`

## 字体与信息层级

### 字体分工

源码中正文和大标题主要使用 `Calibre`，辅助信息使用 `SF Mono`。

### 层级规律

- 大标题体量很大，用于建立首屏重心
- 正文宽度被刻意限制，保持阅读节奏
- 按钮、导航、编号、日期、技术栈标签统一走 mono
- 标题和正文的颜色层级明显分开

### 对当前项目的启发

如果项目保留当前技术内容导向，建议借鉴“正文字体 + 辅助 mono 字体”的分工，但要根据实际内容密度重新评估字号，不必完全照搬原站偏小的正文。

## 全局样式系统观察

`GlobalStyle.js` 体现了这套设计系统的成熟度，值得重点借鉴：

- 键盘焦点样式完整
- `:focus-visible` 单独处理
- 自定义滚动条
- 自定义文本选区颜色
- 全局 section 间距统一
- 主内容宽度与页面 padding 体系统一
- 图片、链接、代码块、列表、blockquote 都有统一规范
- 支持 `prefers-reduced-motion`

### 这部分建议优先参考

- 焦点可访问性
- 统一 transition 变量
- 全局留白比例
- 链接 hover 风格
- 组件共用 mixin 设计

## 页面级观察

以下观察基于桌面端与移动端截图补充整理。

### 桌面端

#### 首屏

- 首屏依靠超大标题、极少文案和大量留白建立高级感
- 内容收在左侧窄列，右侧保留大块空白
- 顶部导航尺寸很小，避免与首屏标题竞争
- 视觉重心非常明确，先标题、再副标题、最后 CTA

#### Section 节奏

- 每个 section 顶部都有统一的编号标题和横线
- 页面纵向节奏很强，段落之间不会过密
- 每个区块的视觉任务单一，没有一屏内放太多交互

#### About

- 文本和头像双栏布局清晰
- 头像本身并不华丽，真正的设计感来自滤镜、蒙版、描边框和 hover
- 技能列表使用 mono 字体和小号箭头符号统一细节

#### Where I've Worked

- 使用 tab 切换经历
- 左侧是极轻的 tab 导航，右侧是内容
- 高亮条只做位置移动，交互非常克制

#### Some Things I've Built

- 桌面端最有设计张力的部分
- 项目图片和文案采用交错叠压布局
- 图片默认降饱和、加色彩混合，hover 再放开
- 描述卡片悬浮在图片之上，形成清晰的视觉层次

#### Other Noteworthy Projects

- 使用规则卡片网格收束页面
- 卡片统一深色底、轻微抬升、统一 icon 和标题结构
- 这是很适合迁移到内容型页面的模式

#### 页脚与侧边元素

- 桌面端左右固定侧栏增强识别度
- 这类元素很适合作为个人 portfolio 的品牌细节
- 对普通项目站点而言不一定必要

### 移动端

#### 整体判断

- 移动端不是简单等比缩小，而是重组了信息表达方式
- 页面仍保留了原本的暗色气质和节奏感

#### 导航

- 顶部导航变成极简 hamburger
- 桌面端左右固定侧栏在移动端被移除
- 社媒入口移动到页脚，更符合移动端使用习惯

#### 首屏

- 标题权重依然足够强
- 文案列宽收得合理，没有被拉得过宽
- CTA 保留但不喧宾夺主

#### Featured 项目区

- 从桌面端的“图文交错叠压”转为移动端单列信息卡
- 项目图片被弱化为背景视觉，而不是主要信息容器
- 这是一种非常成熟的响应式取舍

#### 项目卡片区

- 移动端仍保持规整网格感，而非退化成普通列表
- 说明站点更重视设计统一性，而不是最大化信息舒适度

#### 风险

- 移动端文字整体偏小
- 信息密度对阅读型产品来说略高
- 如果当前项目偏文档、内容、工具，后续实现时应适当放大正文与卡片内容字号

## 关键组件设计规律

### 导航

`nav.js` 显示桌面导航的核心规则：

- 固定在顶部
- 半透明深底
- 毛玻璃模糊
- 滚动向下隐藏
- 滚动向上出现
- 小号 mono 导航文本
- 右上角描边按钮

### 移动菜单

`menu.js` 显示移动菜单具备以下特征：

- 抽屉从右侧滑入
- 背景内容整体 blur + brightness 降低
- 汉堡按钮动画统一
- 焦点管理和点击外部关闭均已处理

### 按钮

`mixins.js` 中按钮很有代表性：

- 透明底
- 单线描边
- accent 色文字与边框
- hover 时轻微位移
- 同时增加描边阴影

### 链接

- 行内链接 hover 不是粗暴改色，而是底部短线延展
- 这种做法很适合暗色主题，既有反馈又不刺眼

### 卡片

- 卡片背景比页面底色高一级
- 阴影存在，但整体仍然克制
- hover 主要体现为轻微上浮

## 动效系统观察

### 使用方式

- 首屏加载使用 `animejs`
- 页面元素进场使用 `react-transition-group`
- 滚动进入视口使用 `scrollreveal`
- 所有动画都服从统一的 easing 与 transition 变量

### 设计原则

- 动效是为了建立节奏，不是为了制造存在感
- 动画幅度较小
- 以透明度和位移为主
- 对 `prefers-reduced-motion` 做了兼容

### 对当前项目的建议

值得借鉴“动画节奏和克制程度”，不建议直接复制老技术栈中的动画实现方案。

## 当前项目可直接借鉴的内容

### 建议保留

- 默认 `dark` 作为第一主题
- 深海军蓝背景体系
- 冷灰蓝文本层级
- 单一 accent 颜色系统
- section 编号标题样式
- 描边按钮与轻微位移动效
- 深色卡片与轻层级阴影
- 桌面端和移动端分别设计信息密度
- 统一 token 和 transition 变量

### 建议重点复用的视觉规律

- `bg` 与 `bg-elevated` 的层级关系
- 标题、正文、辅助信息的颜色差
- 少量高亮，避免暗色页面过亮
- 大留白配合少量重点内容
- Featured 内容与普通列表内容做清晰区分

## 不建议直接照搬的内容

### 原因

这些内容与个人 portfolio 身份强绑定，容易形成高相似度复刻。

### 不建议照搬的项

- 左侧社媒固定栏
- 右侧竖排邮箱
- 个人化首屏文案结构
- 头像样式和个人信息排布
- 完整 section 顺序
- 几乎一致的 featured 项目交错布局
- Brittany 的 logo 和图形语汇

## 默认 dark 主题的落地建议

### 总体判断

这个参考站非常适合当作当前项目的默认暗色主题基准样板。

### 适合的前提

- 项目希望有一定技术感和品牌感
- 页面不只是功能工具，还希望体现审美完整性
- 首屏和导航愿意为视觉统一让出一定空间

### 需要调整的部分

- 如果项目更偏文档或阅读，应提高正文可读性
- 如果项目内容密集，应减少过大留白
- 如果项目交互更复杂，应降低装饰性布局比例

## 未来主题切换方案建议

### 当前判断

原站本身没有主题切换，颜色基本写死在 `:root` 中，因此它适合做视觉参考，不适合直接作为多主题实现参考。

### 后续实现原则

- 默认主题为 `dark`
- 从一开始就用语义 token，而不是颜色名 token
- 组件行为不要依赖特定颜色名
- 主题切换仅替换变量，不重写组件结构

### 建议的最小 token 集

- `--bg`
- `--bg-elevated`
- `--bg-overlay`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--border-subtle`
- `--accent`
- `--accent-soft`
- `--shadow-strong`
- `--focus-ring`

### 切换功能的实现边界

后续加 light theme 时，应保持以下内容不变：

- 布局结构
- 组件层级
- 交互反馈方式
- section 节奏

应变化的内容仅包括：

- 颜色 token
- 阴影强度
- 边框对比度
- 某些图片滤镜策略

## 风险与边界

### 版权与参考边界

README 中已经明确表达：

- 可以 fork/use
- 需要 attribution
- 不鼓励抄袭或冒充原创

因此当前项目可以参考其设计语言，但应避免形成高相似度直接复刻。

### 调研边界说明

本次浏览器 MCP 原计划用于直接抓取线上页面结构与样式细节，但由于本机存在残留 `chrome-devtools-mcp` 进程导致连接异常，最终页面级结论主要基于：

- GitHub 仓库源码
- 站点公开信息
- 本次会话中的桌面端与移动端截图

对于当前阶段的设计调研与主题规划，这一结论集已经足够支撑后续方案设计。

## 对当前项目的最终建议

### 可以作为基准参考的部分

- dark-first 视觉系统
- 语义层次清晰的配色结构
- 简洁有控制感的交互细节
- 高质量的 section 组织方式
- Featured 与普通内容的等级差

### 需要结合项目重新设计的部分

- 首页信息组织
- 文案密度
- 导航交互
- 响应式下的卡片密度
- 页面个性化识别元素

## 后续执行建议

后续真正开始写代码前，可以基于本记录继续拆出以下文档：

1. `dark theme token` 草案
2. 组件级样式映射表
3. 主题切换实现方案
4. 首页与内容页的布局规范


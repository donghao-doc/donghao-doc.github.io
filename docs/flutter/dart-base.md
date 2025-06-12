# 基础语法

## 入口方法

Dart 中所有要被执行的代码都要放在 `main` 方法中。

```dart
// void 表示没有返回值
void main() {
  print('Hello, Dart!');
}
```

## 注释

```dart
// 单行注释

/// 文档注释，用于生成文档

/*
 * 多行注释
 * 多行注释
 * 多行注释
*/
```

## 变量声明

```dart
// 动态类型，会自动推断类型
var name = '张三';
var age = 18;
var isStudent = true;

// 静态类型
String name = '张三';
int age = 18;
double height = 1.88;
bool isStudent = true;
List<String> names = ['张三', '李四', '王五'];
Map<String, int> scores = {'张三': 95, '李四': 90, '王五': 85};

// 编译时常量
const name = '张三';

// 运行时常量
final name;
name = new DateTime.now();
```

`const` 在编译时就已经确定了值，`final` 在运行时才确定值。即 `final` 可以一开始不赋值，代码运行时再赋值，但只能赋值一次。

# 1.new的实现
new操作符做了这些事：

它创建了一个全新的对象。
它会被执行[[Prototype]]（也就是__proto__）链接。
它使this指向新创建的对象。
通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
如果函数没有返回对象类型Object，那么new表达式中的函数调用将返回该对象引用。

```
function create () {
   // 创建一个空对象
  let obj = new Object();
  // 获取构造函数
  let Constructor = [].shift.call(arguments);
  // 链接到原型
  obj.__proto__ =  Constructor.prototype;
  // 绑定this值
  let result = Constructor.apply(obj,arguments);
  //. 返回新对象
  return typeof result === "object" ? result : obj
}
```

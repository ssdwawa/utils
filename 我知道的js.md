# 1.new的实现
new操作符做了这些事：

它创建了一个全新的对象。  将这个空对象的__proto__成员指向了构造函数对象的prototype成员对象  它使this指向新创建的对象。  返回新对象obj

```
function fun(){
....
}

function NEW (func) {
   // 创建一个空对象
  let obj = new Object();
  // 链接到原型
  obj.__proto__ =  func.prototype;
  // 绑定this值
  let result = func.apply(obj,arguments);
  //. 返回新对象
  return typeof result === "object" ? result : obj
}
```

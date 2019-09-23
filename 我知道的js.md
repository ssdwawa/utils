# 1.new的实现
new操作符做了这些事：

它创建了一个全新的对象。  

将这个空对象的__proto__成员指向了构造函数对象的prototype成员对象  

它使this指向新创建的对象。  返回新对象obj

```
function Person(name,age){
    this.name = name;
    this.age = age;
}

function New (f) {
  //返回一个func
    return function () {
        var o = {"__proto__": f.prototype};
        f.apply(o, arguments);//继承父类的属性
        return o; //返回一个Object
    }
}

var p2 = New(Person)("Jack",25);
p2.name;//Jack
p2.age;//25
```

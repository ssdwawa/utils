# 1.new的实现
new操作符做了这些事：

它创建了一个全新的对象。  

将这个空对象的__proto__成员指向了构造函数对象的prototype成员对象  

它使this指向新创建的对象。  返回新对象obj

```
function Person(name, age) {
            this.name = name;
            this.age = age;
        }

function NEW(fun) {
            return function() {
                // 创建一个空对象
                let obj = new Object();
                // 链接到原型
                obj.__proto__ = fun.prototype;
                // 绑定this值
                let result = fun.apply(obj, arguments);
                //. 返回新对象
                return typeof result === 'object' ? result : obj;
            };
        }

var p = NEW(Person)('ssd', '26');

```

# 2.防抖节流
防抖：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次
```
 const debounce = (fn, delay) => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    fn();
                }, delay);
            };
```
节流：一段时间内只执行一次

```
function throttle(fn, delay) {
    let last = 0;
    return function() {
        let curr = +new Date();
        if (curr - last > delay) {
            fn.apply(this, arguments);
            last = curr;
        }
    };
}
            
let pj = throttle(handle, 1000);

var textElement = document.getElementById('test');
textElement.oninput = function() {
    pj('123');
};
```

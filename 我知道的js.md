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

# 3.递归深度拷贝
```
 /**
             * 判断是否是基本数据类型
             * @param value
             */
            function isPrimitive(value) {
                return (
                    typeof value === 'string' ||
                    typeof value === 'number' ||
                    typeof value === 'symbol' ||
                    typeof value === 'boolean'
                );
            }

            /**
             * 判断是否是一个js对象
             * @param value
             */
            function isObject(value) {
                return (
                    Object.prototype.toString.call(value) === '[object Object]'
                );
            }

            /**
             * 深拷贝一个值
             * @param value
             */
            function cloneDeep(value) {
                // 记录被拷贝的值，避免循环引用的出现
                let memo = {};

                function baseClone(value) {
                    let res;
                    // 如果是基本数据类型，则直接返回
                    if (isPrimitive(value)) {
                        return value;
                        // 如果是引用数据类型，我们浅拷贝一个新值来代替原来的值
                    } else if (Array.isArray(value)) {
                        res = [...value];
                    } else if (isObject(value)) {
                        res = { ...value };
                    }

                    // 检测我们浅拷贝的这个对象的属性值有没有是引用数据类型。如果是，则递归拷贝
                    Reflect.ownKeys(res).forEach(key => {
                        if (typeof res[key] === 'object' && res[key] !== null) {
                            //此处我们用memo来记录已经被拷贝过的引用地址。以此来解决循环引用的问题
                            if (memo[res[key]]) {
                                res[key] = memo[res[key]];
                            } else {
                                memo[res[key]] = res[key];
                                res[key] = baseClone(res[key]);
                            }
                        }
                    });
                    return res;
                }

                return baseClone(value);
            }
```


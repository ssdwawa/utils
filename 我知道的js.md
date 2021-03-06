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
                //定义一个全局的变量this.timer 每次执行都清除掉它，最后一次不清除了，延迟执行
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    fn();
                }, delay);
            };
```
节流：一段时间内只执行一次

```
function throttle(fn, delay) {
     //定义一个初始时间，每次执行的时候记录上一次执行的时间，如果大于传入的延迟时间则执行函数
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

浅拷贝只拷贝表层，如果内部还有对象则该对象还是引用内存

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
笔记：递归要注意 先写好递归的终止命令，再想好递归的结果，因为递归的最终结果和递归过程结果格式是一样的。再去写递归的逻辑。以走楼梯为例，先想想到结果发生时候的情况，即我块走到顶部了。剩余1个或2个台阶则返回可能的走法数量1或2，设为终结。递归函数用自然想法描写就是一次走一个和走俩个的合


# 4.call,apply,bind

call

```
 let Person = {
    name: 'Tom',
    say() {
        console.log(this);
        console.log(`我叫${this.name}`);
    }
};

let Person1 = {
    name: 'Tom1'
};

Function.prototype.myCall = function(context,...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context = context || window;
    //原里很简单，传入的第一个参数是要绑定的函数，那么我们把这个函数的创建一个空间，
    //并把this绑定到这个空间上，this指向调用者（这里指向Person.say）,随后执行这个函数
    //此时这个this就绑到了context上了
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
};

// 测试
Person.say.myCall(Person1, 'ssd', 'ssd1'); //我叫Tom1
```
apply

```
Function.prototype.myApply = function(context, args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context = context || window;
    context.fn = this;

    const result = context.fn(...args);
    delete context.fn;
};
```
bind

```
 Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context = context || window;
    context.fn = this;

    const args = [...arguments].splice(1);

    return function() {
        context.fn(...args);
    };
};
```
# promise实现

总结：iPromise类中分为reslove exec then三个部分

reslove遍历fulArray执行，state设置为full
exec把传递进来的参数放到constructor执行  
then  return new iPromise ， 如果state为pending,push数组到arr里，push的是一个函数

function (data) {
            var x = onFulfilled(data)
            //判断，如果这个函数内部还是Promise，则继续then
            if (x instanceof Promise) {
                        x.then(resolve)
            }
}

```
            <script>
            class iPromise {
                        constructor(exec) {
                                    this.value = null;
                                    this.reason = null;
                                    this.state = 'pending';
                                    this.fulArray = [];

                                    const reslove = value => {
                                                this.value = value;
                                                this.state = 'full';
                                                this.fulArray.forEach(fn => fn(this.value));
                                    };

                                    exec(reslove); // 执行传入的函数，而这个函数内部可以调用 同层的reslove
                                    //执行顺序为promise内部的函数然后内部函数的reslove然后then中事件，若内部函数为异步则先执行then再执行内部
                        }


                        //对传递进来的函数做判断，若需要链式调用则在then内部执行的函数也要返回Promise，在异步状态下是将参数存到列表中
                        then(onFulfilled) {
                                    return new iPromise((resolve) => {
                                                if (this.state === 'pending') {
                                                            this.fulArray.push(function (data) {
                                                                        var x = onFulfilled(data)
                                                                        //判断，如果这个函数内部还是Promise，则继续then
                                                                        if (x instanceof Promise) {
                                                                                    x.then(resolve)
                                                                        }
                                                            });

                                                } else if (this.state == 'full') {
                                                            onFulfilled(value);
                                                }

                                    });
                        };
            }

            //test

            var A = new iPromise(reslove => {
                        setTimeout(() => {
                                    reslove(1);
                        }, 10);
            });

            A.then(value => {
                        console.log(value)
                        return new Promise(
                                    function (resolve) {
                                                // 模拟异步请求
                                                setTimeout(() => {
                                                            resolve(15)
                                                }, 1000);
                                    }
                        )
            }).then(value => {
                        console.log(value);
            })
            </script>
```

**all**
```
Promise.all = arr => {
	let aResult = []; //用于存放每次执行后返回结果
	return new Promise(function (resolve, reject) {
		let i = 0;
		next(); //开始逐次执行数组中的函数
		function next() {
			arr[i].then(function (res) {
				aResult.push(res); //执行后返回的结果放入数组中
				i++;
				if (i == arr.length) { //如果函数数组中的函数都执行完，便把结果数组传给then
					resolve(aResult);
				} else {
					next();
				}
			})
		}
	})
}
```

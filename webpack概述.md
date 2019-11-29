## 1个最简单的webpack

```
// 该文件其实最终是要在node环境下执行的
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

// 导出一个具有特殊属性配置的对象
module.exports = {
    entry:['babel-polyfill','./src/main.js'],/* 入口文件模块路径 */
    output:{
        path:path.join(__dirname,'./dist/'),/* 出口文件模块所属目录，必须是一个绝对路径 */
        filename:'bundle.js'/* 打包的结果文件名称 */
    },
    devServer:{
        // 配置webpack-dev-server的www目录
        contentBase:'./dist'
    },
    plugins:[
        // 该插件可以把index.html打包到bundle.js文件所属目录，跟着bundle走
        // 同时也会自动在index.html中注入script引用链接，并且引用的资源名称，也取决于打包的文件名称
        new htmlWebpackPlugin({
            template:'./index.html'
        })
    ],
    module:{
        rules:[
            {
                test:/.css$/,
                use:[
                    //注意：这里的顺序很重要，不要乱了顺序
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/.(jpg|png|gif|svg)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,//排除掉node_module目录
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env'], //转码规则
                        plugins:['transform-runtime']
                    }
                }
            }
        ]
    }
}
```
# webpack常用参数有哪些，及其功能

  ## entry：告诉Webpack应用的根模块或起始点在哪里
    字符串，如entry:"./src/index.js"

　　数组形式： 如entry:[react, react-dom],可以把数组中的多个文件打包转换为一个chunk

　　对象形式，如果需要配置的是多页的应用，或者我们哟啊抽离出指定模块作为指定公共代码，需要采用这种形式，属性名是占位符[name]的值
  
    如
    ```
    entry: {

      main:'./src/index2.js',

      second: './src/index2.js',

      vendor:['react', 'react-dom']

    }
    ```
    
  ## output:会告诉webpack在哪里输出所创建的bundle.js以及如何命名
  
  ```
  　out：{

　　　　path:path.join(__dirname, './dist'),

　　　　name: 'js/bundle-[name]-[hash].js,

　　　　chunkFilename: 'js/[name].chunk.js',

　　　　publicPath:'/dist/'

　　}
  ```
  
  module:webpack中，loader的配置主要在module.rules中进行，这是一个数组，每一个rule做了两件事

        识别文件类型，来确定具体处理该数据的loader(Rule.test属性)
        使用相关的loader对文件进行相关的操作转换(Rule.use属性）     
  比如我们想要处理react中的jsx语法
     ```
     module: {

      rules:[{

        test: /(\.jsx|\.js)/,  //表示匹配规则，是一个正则表达式

        use:{   　　　　 //表示针对匹配文件将使用处理的loader

          loader: "babel-loader",　　

          options: {

            presets: ["es2015", "react"]

          }

        }

      }]

    }
    ```
     
 ## plugin（loader不能做的处理都能交给plugin来做）
 
 ```
 const CleanWebpackPlugin = require("clean-webpack-plugin")

{

　　...

　　plugin:[

　　　　new webpack.DefinePlugin({

　　　　　　"process.env" : {

　　　　　　　　NODE_ENV: JSON.stringify("production")

　　　　　　}

　　　　}),
　　　　new CleanWebpackPlugin(["js"], {

　　　　　　root: __dirname + "/stu/",
　　　　　　verbose: true,
　　　　　　dry: false
　　　　})
　　]

}
 ```
 
 ## 　一些辅助开发的相关属性
    devtool:打包后的代码和原始代码存在较大的差异，此选项控制是否生成以及如何生成sourcemap

　　devserver：通过配置devserver选项，可以开启一个本地服务器

　　watch：启用watch模式后，webpack将持续监听热河已经解析文件的更改，开发是开启会很方便

　　watchoption：用来定制watch模式的选项
  
## 启动
   在package中配置启动命令
   ```
   "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --mode development --config config/webpack.dev.conf.js --open",
    "build": "webpack --mode production --config config/webpack.prod.conf.js"
  },
   ```
  

　　performance：打包后命令行如何展示性能提示，如果超过某个大小是警告还是报错
 

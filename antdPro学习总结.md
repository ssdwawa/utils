 
 *路由和新建页面

路由在config里面进行创建，总分总的路由形式，路由的模板或者自定义形式在component中
子路由写在routes里，子路由的展示通过props.children
新建页面通过在config里面配置好他的位置，在components定义好位置即可，一级路由在layout里二级的默认就在pages中

 *redux-saga
 
 models写在相关的文件夹下记得写对 namespace, 会自动生成umi地址
 
 在代码里用的时候写
 ```
 export default connect(({ test }) => {

    return {
        testExample: test,
    }
}
)(Test);
 ```
 绑定相关的进入props中，用法在总函数中const { testExample , dispatch } = props;
 
 使用函数
 ```
 const testClick =  async () => {
    
        const pay = await dispatch({
            type: 'test/testFunc',
            payload: {status:'ok',type:'test ok'},
        });

    }
 ```
 
 modeles触发
 ```
 const Test = {
    namespace: 'test',
    state: {
        status: 'wait',
    },
    effects: {
        *testFunc({ payload }, { call, put, take }) {

            yield put({
                type: 'changeTestStatus',
                payload: { status: 'ok', type: 'test ok' },
            }); // Login successfully

            return 123

        },


    },
    reducers: {
        changeTestStatus(state, { payload }) {
            return { ...state, status: payload.status, type: payload.type };
        },
    },
};

export default Test;

 ```
 

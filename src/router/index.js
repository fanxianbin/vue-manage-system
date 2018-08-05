import mainMenu from '../components/common/mainMenu'
import store from '@/store'
/**
 * 导入模板
 */
import index from '../components/page/Home.vue';
let home = resolve => require(['../components/common/Home.vue'], resolve);
let dashboard =  resolve => require(['../components/page/Dashboard.vue'], resolve);
let table = resolve => require(['../components/page/BaseTable.vue'], resolve);
let tabs = resolve => require(['../components/page/Tabs.vue'], resolve);
let form = resolve => require(['../components/page/BaseForm.vue'], resolve);
let editor = resolve => require(['../components/page/VueEditor.vue'], resolve);
let markdown = resolve => require(['../components/page/Markdown.vue'], resolve);

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     component: index,
        //     meta: { title: '首页',lastHoldig:true,showTag:true}
        // },
        {
            path: '/',
            component: home,
            meta: { title: '外层包裹文件' },
            children:[
                {
                    path: '',
                    name:'home',
                    component: index,
                    meta: { title: '首页',lastHoldig:true,showTag:true}
                },
                {
                    path: '/dashboard',
                    component: dashboard,
                    meta: { title: '数据看板',showTag:true}
                },
                {
                    path: '/table',
                    component: table,
                    meta: { title: '基础表格',showTag:true}
                },
                {
                    path: '/tabs',
                    component: tabs,
                    meta: { title: 'tab选项卡',showTag:true}
                },
                {
                    path: '/test/form',
                    component: form,
                    meta: { title: '基本表单',showTag:true}
                },
                {
                    // 富文本编辑器组件
                    path: '/test/editor',
                    component: editor,
                    meta: { title: '富文本编辑器',showTag:true}
                },
                {
                    // markdown组件
                    path: '/test/markdown',
                    component: markdown,
                    meta: { title: 'markdown编辑器',showTag:true}    
                },
                {
                    // 图片上传组件
                    path: '/test/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传',showTag:true}   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表',showTag:true}
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表',showTag:true}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true,showTag:true}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    //公共路由修改页面之前，需要先保存页面相对位置
    if(mainMenu.isPathInMenu(from.path)){
        let content = document.querySelector("#content-box .content");
        if(content){
            let param = {};
            param.path = from.path;
            param.position = content.scrollTop;
            store.commit("setTagPosition",param);
        }
    }
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        router.replace({path:'/login',query:{redirect:to.fullPath}});
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
});
export default router

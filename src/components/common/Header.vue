<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChange">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="main-menu">
            <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#242f42"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-menu-item index="deal-center">处理中心</el-menu-item>
                <el-menu-item index="workplat">工作平台</el-menu-item>
                <el-menu-item index="msg-center">消息中心</el-menu-item>
                <el-menu-item index="order-manager">订单管理</el-menu-item>
            </el-menu>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="/static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="hover" @command="handleCommand" :show-timeout="0" >
                    <span class="el-dropdown-link" style="font-size:16px;padding:10px 0">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="https://www.baidu.com" target="_blank">
                            <el-dropdown-item>关于我们</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  command="resetPwd">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '@/store'
    import mainMenu from './mainMenu'
    export default {
        data() {
            return {
                fullscreen: false,
                name: 'linxin',
                message: 2,
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            },
            activeIndex(){
                let menus = mainMenu.mainMenu;
                if(this.$route.name == 'home'){
                     store.commit("setMainMenuActiveIndex",menus[0].activeIndex);
                    return menus[0].activeIndex;
                }
                // return null;
                for(let menu of menus){
                    let items = menu.items;
                    for(let item of items){
                        if(item.subItems){
                            for(let sub of item.subItems){
                                if(item.index+sub.index == this.$route.path){
                                    store.commit("setMainMenuActiveIndex",menu.activeIndex);
                                    return menu.activeIndex;
                                }
                            }
                        }else{
                            if(item.index == this.$route.path){
                                store.commit("setMainMenuActiveIndex",menu.activeIndex);
                                return menu.activeIndex;
                            }
                        }
                    }
                }
            }
        },
        methods:{
            //主菜单切换
            handleSelect(index){
                store.commit("setMainMenuActiveIndex",index);
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChange(){
                store.commit("setMainMenuItemCollapse");
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>
<style lang="scss" scoped>
    $height: 50px;
    .header {
        box-sizing: border-box;
        width: 100%;
        height: $height;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: $height;
    }
    .header .logo{
        float: left;
        width:200px;
        line-height: $height;
    }
    .header-right{
        float: right;
        padding-right: 20px;
    }
    .header-user-con{
        display: flex;
        height: $height;
        align-items: center;
    }
    .header .main-menu{
        float: left;
        li{
            height:$height;
        }
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 22px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>

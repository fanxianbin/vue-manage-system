<template>
    <el-menu id="sidebar-el-menu" class="sidebar-el-menu" :collapse="collapse" router>
        <template v-for="item in items">
            <template v-if="item.subItems">
                <el-submenu :index="item.index" :key="item.index" :show-timeout="1">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="subItem in item.subItems" :key="subItem.index" :index="item.index+subItem.index" style="padding-left:30px;">
                         <i :class="subItem.icon"></i>
                        <span>{{ subItem.title }}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index" style="padding-left:10px;">
                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script>
    import store from '@/store'
    import mainMenu from './mainMenu'
    
    export default {
        data() {
            return {
            }
        },
        methods:{
        },
        computed:{
            collapse(){
                return store.state.mainMenuItemCollapse;
            },
            items(){
                let index = store.state.mainMenuActiveIndex;
                console.log(index);
                for(let menu of mainMenu.mainMenu){
                    if(menu.activeIndex == index){
                        return menu.items;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar-el-menu{
        width: 180px;
    }
    .sidebar-el-menu > ul {
        height:100%;
    }
    .el-menu-item{
        height:46px;
        line-height:46px;
    }
</style>
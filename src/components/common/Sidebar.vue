<template>
    <el-menu class="sidebar-el-menu" :collapse="collapse" background-color="#324157"
        text-color="#bfcbd9" active-text-color="#20a0ff" router>
        <template v-for="item in items">
            <template v-if="item.subItems">
                <el-submenu :index="item.index" :key="item.index" :show-timeout="1">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="subItem in item.subItems" :key="subItem.index" :index="item.index+subItem.index">
                         <i :class="subItem.icon"></i>
                        <span>{{ subItem.title }}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
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

<style scoped>
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>

<template>
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
        text-color="#bfcbd9" active-text-color="#20a0ff" @select="handleSelect">
        <template v-for="item in items">
            <template v-if="item.subItems">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="(subItem,i) in item.subItems" :key="i" :index="subItem.index">
                        {{ subItem.title }}
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
            handleSelect(index,pathIndex) {
                let toPath = pathIndex.join('');
                let currPath = this.$route.fullPath;
                if(currPath == toPath){
                    return;
                }
                this.$router.push(toPath);
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            collapse(){
                return store.state.mainMenuItemCollapse;
            },
            items(){
                let index = store.state.mainMenuActiveIndex;
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

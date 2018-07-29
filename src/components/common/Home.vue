<template>
    <div class="wrapper">
        <el-container style="height:100%">
            <el-header style="height:50px;">
                <v-head></v-head>
            </el-header>
            <el-container style="height:100%;position:relative">
                <el-aside>
                    <v-sidebar></v-sidebar>
                </el-aside>
                <el-main>
                    <div class="content-box" :class="{'content-collapse':collapse}">
                        <v-tags></v-tags>
                        <div class="content">
                            <transition name="move" mode="out-in">
                                <keep-alive :include="tagsList">
                                    <router-view></router-view>
                                </keep-alive>
                            </transition>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import store from '@/store/store'
    export default {
        data(){
            return {
                tagsList: [],
            }
        },
        computed:{
            collapse(){
                return store.state.mainMenuItemCollapse;
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            // bus.$on('collapse', msg => {
            //     this.collapse = msg;
            // })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .el-header{
        padding:0;
    }
</style>

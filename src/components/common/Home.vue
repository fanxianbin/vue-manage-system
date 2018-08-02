<template>
    <div class="wrapper">
        <el-container style="height:100%">
            <el-header style="height:50px;">
                <v-head></v-head>
            </el-header>
            <el-container style="position:relative;left:0;top:0">
                <el-aside class="sidebar">
                    <v-sidebar></v-sidebar>
                </el-aside>
                <el-main id="content-box" class="content-box" style="padding:0;" :class="{'content-collapse':collapse}">
                        <!-- 如果当前页面是导航页则显示导航标签，如果是详情页则显示为面包屑 -->
                        <v-tags class="fixed-tags"></v-tags>
                        <!-- <div style="height:25px;width:100%;"></div> -->
                        <div class="content">
                            <transition :css="true" mode="out-in" @enter="enter" @before-enter="beforeenter" @after-enter="afterenter">
                                <keep-alive :include="tagsList">
                                    <router-view></router-view>
                                </keep-alive>
                            </transition>
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
                //tagsList: [],
            }
        },
        computed:{
            collapse(){
                return store.state.mainMenuItemCollapse;
            },
            tagsList(){
            	let tagsList = store.state.tagsList;
            	let arr = [];
              for(let i = 0; i < tagsList.length; i ++){
                  tagsList[i].name && arr.push(tagsList[i].name);
              }
              console.log(arr);
            	return arr;
            }
        },
        methods:{
            beforeenter(){
            },
            enter(el,done){
                let position = store.state.pagePosition;
                document.querySelector("#content-box .content").scrollTo(0,position);
                done();
            },
            afterenter(){
            }
        },
        components:{
            vHead, vSidebar, vTags
        }
    }
</script>

<style lang="scss" scoped>
    .el-header{
        padding:0;
    }
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }

    #content-box .fixed-tags{
        width:100%;
        height: 36px;
        // overflow: hidden;
        background: #fff;
        // padding-right: 220px;
        // z-index: 10;
        box-shadow: 0 5px 10px #ddd;
        border-bottom: 1.5px solid #ccc;
    }
</style>

<template>
    <div id="page">
        <v-head class="header"></v-head>
        <div class="content-body">
            <v-sidebar class="sidebar"></v-sidebar>
            <div class="content-box">
                <transition :css="false" mode="out-in"  @enter="enter">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import store from '@/store'
    import mainMenu from './mainMenu' 
    export default {
        data(){
            return {
                reload:true
            }
        },
        methods:{
            beforeenter(){
            },
            enter(el,done){
                $(window).scrollTop(0);
                done();
            },
            afterenter(){
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            store.commit("pushTagList",this.$route);
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        position: fixed;
        top:0;
        left:0;
        z-index: 990;
    }
    .content-body{
        position:relative;
        left:0;
        top:0;
        width:1160px;
        margin:0 auto;
    }
    .content-box {
        position: relative;
        left: 180px;
        right: 0;
        top: 0;
        width:960px;
        margin-left: 20px;
        padding-bottom: 50px;
        box-sizing: border-box;
    }
    .sidebar{
        display: block;
        position: fixed;
        height:100%;
        margin-top:55px;
        top: 0;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
</style>

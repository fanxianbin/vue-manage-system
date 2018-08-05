<template>
    <div id="main-tags" class="tags" v-if="showTags">
        <div class="tags-tab">
            <table class="tags-box">
                <tr>
                    <td class="tags-li" @contextmenu.stop="showContextmenu($event,index)" v-for="(item,index) in tagList" @click="changeToTag(item.path)" :class="{'active': isActive(item.path)}" :key="index">
                        <a class="tags-li-title">{{item.title}}</a>
                        <span class="tags-li-icon" @click.stop="closeTag(index)"><i class="el-icon-close"></i></span>
                    </td>
                </tr>
            </table>
            <!-- 滚动条显示/隐藏触发器 -->
            <div class="tags-slip" v-show="showSlip">
                <el-button size="mini" type="primary" @mousedown.native="slipLeft" @mouseup.native="slipLeftCancel">
                    <i class="el-icon-caret-left"></i>
                </el-button>
                <el-button size="mini" type="primary" @mousedown.native="slipRight" @mouseup.native="slipRightCancel">
                    <i class="el-icon-caret-right"></i>
                </el-button>
            </div>
        </div>
        <contextmenu :contextmenuData="contextmenuData" @e-contextmenu-tags="closeHandler"></contextmenu>
    </div>
</template>

<script>
    import store from '@/store';
    import contextmenu from './Contextmenu.vue'
    let addTagValidator =(value) =>{
        if(!value){
            return "内容不能为空";
        }
        if(value.startsWith("http") && !value.startsWith(location.origin)){
            return "跳转地址不能跨域";
        }
    }
    let slipTimer = null;
    export default {
        data() {
            return {
                showSlip:false,
                contextmenuData: {
                    menuName: 'tags',
                    attachData:null,
                    axios: {
                        x: null,
                        y: null
                    },
                    paddingLeft: null,
                    width:null,
                    menulist: [{
                        command: 'closeCurr',
                        text: '关闭标签页'
                    },
                    {
                        command: 'closeOther',
                        text: '关闭其他标签页'
                    },
                    {
                        command: 'closeLeft',
                        text: '关闭左侧标签页'
                    },
                    {
                        command: 'closeRight',
                        text: '关闭右侧标签页'
                    },
                    {
                        command: 'closeAll',
                        text: '关闭所有标签页'
                    }
                    ]
                }
            }
        },
        components:{
            contextmenu
        },
        methods: {
            slipLeft(){
                let mainTag = $("#main-tags");
                let tagsTab = mainTag.find(".tags-tab");
                let tagBox = mainTag.find(".tags-box")
                //tab宽度恒定不变
                let tagsTabWidth = tagsTab.width();
                let tagBoxWidth = tagBox.width();
                let left;
                let leftWidth = tagBoxWidth-tagsTabWidth;
                if(tagsTabWidth < tagBoxWidth){
                    slipTimer = setInterval(()=>{
                        left = parseFloat(tagBox.css("left").replace("px",''));
                        tagBox.css("left",left-10>-leftWidth?left-10:-leftWidth);
                    },20);
                }
            },
            slipLeftCancel(){
                if(slipTimer){
                    clearInterval(slipTimer);
                }
            },
            slipRight(){
                let mainTag = $("#main-tags");
                let tagsTab = mainTag.find(".tags-tab");
                let tagBox = mainTag.find(".tags-box")
                //tab宽度恒定不变
                let tagsTabWidth = tagsTab.width();
                let tagBoxWidth = tagBox.width();
                let left;
                if(tagsTabWidth < tagBoxWidth){
                    slipTimer = setInterval(()=>{
                        left = parseFloat(tagBox.css("left").replace("px",''));
                        tagBox.css("left",left+10<0?left+10:0);
                    },20);
                }
            },
            slipRightCancel(){
                if(slipTimer){
                    clearInterval(slipTimer);
                }
            },
            isActive(path) {
                return path === this.$route.path;
            },
            // 关闭单个标签
            closeTag(index) {
                let tagList = this.tagList;
                //当前只剩最后一个标签且lastHoldig为true则为最后一个标签不能关闭
                if(tagList.length == 1 && this.$route.name == 'home'){
                    return;   
                }
                //获取删除的元素
                let delItem = tagList[index];
                store.commit("removeTag",index);
                let item = tagList[index] ? tagList[index] : tagList[index - 1];
                if (item){
                    if(this.$route.path == delItem.path){
                        this.$router.push(item.path);
                    }
                }else{
                    this.$router.push('/');
                }
            },
            changeToTag(toPath){
                let currPath = this.$route.path;
                if(currPath === toPath){
                    return;
                }
                this.$router.push(toPath);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            showContextmenu(event,index){
                event.preventDefault();
                let x = event.clientX
                let y = event.clientY
                this.contextmenuData.attachData={index};
                this.contextmenuData.axios = {
                    x, y
                }
            },
            // 关闭其他标签
            closeOther(index){
                if(this.tagList.length > 1){
                    let item = this.tagList[index];
                    if(item.path != this.$route.path){
                        this.$router.push(item.path);
                    }
                    store.commit("resetTagList",[item]);
                }
            },
            closeLeft(index){
                let tagList = this.tagList;
                if(tagList.length == 1){
                    return;
                }
                let currIndex = this.getCurrIndexOfTags;
                if(currIndex < index){
                    let nextPath = this.tagList[index].path;
                    //需要
                    store.commit("removeTagBefore",index);
                    this.$router.push(nextPath);
                }else{
                    store.commit("removeTagBefore",index);
                }
            },
            closeRight(index){
                let tagList = this.tagList;
                if(tagList.length == 1){
                    return;
                }
                let currIndex = this.getCurrIndexOfTags;
                if(currIndex > index){
                    let nextPath = this.tagList[index].path;
                    //需要
                    store.commit("removeTagAfter",index);
                    this.$router.push(nextPath);
                }else{
                    store.commit("removeTagAfter",index);
                }
            },
            closeAll(index){
                if(this.$route.name == "home"){
                    this.closeOther(index);
                }else{
                    store.commit("resetTagList",[]);
                    this.$router.push({name:'home'});
                }
            },
            closeHandler(data){
                let command = data.command;
                let attachData = data.attachData;
                if(command == 'closeCurr'){
                    this.closeTag(attachData.index);
                }else if(command == 'closeOther'){
                    this.closeOther(attachData.index);
                }else if(command == 'closeLeft'){
                    this.closeLeft(attachData.index);
                }else if(command == 'closeRight'){
                    this.closeRight(attachData.index);
                }else{
                    this.closeAll(attachData.index);
                }
            },
            relocate(){
                let mainTag = $("#main-tags");
                let tagBox = mainTag.find(".tags-box");
                let tagsTab = mainTag.find(".tags-tab");
                let tagsTabWidth = tagsTab.width();
                let tagBoxWidth = tagBox.width();
                //定位，滚动到当前选中的元素处，让目标元素在可视区域内
                let viewLeft = tagsTab.offset().left+2;
                let viewRight = viewLeft+tagsTab.width();
                let index=0;
                for(let tag of this.tagList){
                    if(this.$route.path == tag.path){
                        break;
                    }
                    index++;
                }
                let currTag = tagBox.find("td:eq("+index+")");
                let currLeft = currTag.offset().left;
                if(currLeft < viewLeft){
                    let left = parseFloat(tagBox.css("left").replace("px",''));
                    tagBox.css("left",left+(viewLeft - currLeft));
                    return;
                }
                if(currLeft+ currTag.outerWidth()> viewRight){
                    let left = parseFloat(tagBox.css("left").replace("px",''));
                    tagBox.css("left",left-(currLeft+ currTag.outerWidth(true)+4-viewRight));
                    return;
                }
            },
            reCalSlip(){
                let mainTag = $("#main-tags");
                let tagBox = mainTag.find(".tags-box");
                let tagsTab = mainTag.find(".tags-tab");
                let tagsTabWidth = tagsTab.width();
                let tagBoxWidth = tagBox.width();
                this.showSlip = tagsTabWidth < tagBoxWidth;
                if(this.showSlip){
                    this.relocate();
                }else{
                    tagBox.css("left",0);
                }
            }
        },
        computed: {
            showTags() {
                return this.tagList.length > 0;
            },
            tagList(){
                return store.state.tagList;
            },
            getCurrIndexOfTags(){
                let i = 0;
                for(let tag of this.tagList){
                    if(tag.path == this.$route.path){
                        return i;
                    }
                    i++;
                }
            },
            isCollapse(){
                return store.state.mainMenuItemCollapse;
            }
        },
        watch:{
            tagList(){
                this.$nextTick(()=>{
                    this.reCalSlip();
                });
            },
            $route(){
                this.$nextTick(()=>{
                    this.relocate();
                });
            },
            isCollapse(){
                this.$nextTick(()=>{
                   let timer = setTimeout(()=>{
                       clearTimeout(timer);
                       this.reCalSlip();
                   },310);
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .tags{
        position: relative;
    }
    .tags-tab{
        position: relative;
        overflow: hidden;
        height: 36px;
        padding-right:80px;
    }
    .tags-tab .tags-box {
        background: #fff;
        position: relative;
        left: 0;
        top:0;
        box-sizing: border-box;
        height: 100%;
        overflow : hidden;
        white-space: nowrap;
    }
    .tags-tab .tags-li {
        position: relative;
        text-align: left;
        vertical-align: middle;
        white-space: nowrap;
        padding: 0 18px 0 7px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 12.5px;
        overflow: hidden;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 3px;
        background: #fff;
        color: #666;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
        border: 1px solid #409EFF;
        background-color: #409EFF;

        .tags-li-title {
            color: #fff;
        }
    }
    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }
    .tags-tab .tags-slip{
        position: absolute;
        top:0;
        right:0;
        padding:0 2px;
        background-color: #fff; 
        height: 36px;
        line-height: 36px;
        width:76px;
        .el-button {
            padding:7px 9px;
        }

        .el-button+.el-button {
            margin-left: 6px;
        }
    }
</style>

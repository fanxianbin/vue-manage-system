<template>
    <div class="tags" v-if="showTags">
        <ul class="tags-box">
            <li class="tags-li" v-for="(item,index) in tagList" @click="changeToTag(item.path)" @dblclick="reloadCurrPage(item.name)" :class="{'active': isActive(item.path)}" :key="index">
                <a class="tags-li-title">
                    {{item.title}}
                </a>
                <span class="tags-li-icon" @click.stop="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-spanner">
            <el-button size="mini" type="primary">
                <i class="el-icon-plus el-icon--right"></i>
                <span>添加标签</span>
            </el-button>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    import store from '@/store';
    let addTagValidator =(value) =>{
        if(!value){
            return "内容不能为空";
        }
        if(value.startsWith("http") && !value.startsWith(location.origin)){
            return "跳转地址不能跨域";
        }
    }

    export default {
        data() {
            return {
                //tagList: []
            }
        },
        methods: {
            reloadCurrPage(name){
                
            },
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                let tagList = this.tagList;
                //当前只剩最后一个标签且lastHoldig为true则为最后一个标签不能关闭
                if(tagList.length == 1 && this.$route.meta.lastHoldig){
                    return;   
                }
                //获取删除的元素
                let delItem = tagList[index];
                store.commit("removeTag",index);
                let item = tagList[index] ? tagList[index] : tagList[index - 1];
                if (item){
                    if(this.$route.fullPath == delItem.path){
                        this.$router.push(item.path);
                    }
                    //this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagList = curItem;
            },
            changeToTag(toPath){
                let currPath = this.$route.fullPath;
                if(currPath === toPath){
                    return;
                }
                this.$router.push(toPath);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagList.length > 0;
            },
            tagList(){
                return store.state.tagList;
            }
        },
    }

</script>

<style lang="scss" scoped>
    .tags .tags-box {
        box-sizing: border-box;
        width: 80%;
        height: 100%;
        overflow-x :hidden;
    }
		.tags .tags-spanner{
				width: 20%;
       // height: 100%;
		}
    .tags-li {
        float: left;
        margin:2px 5px 2px 2px;
        border-radius: 3px;
        font-size: 13px;
        overflow: hidden;
        cursor: pointer;
        height: 30px;
        line-height: 32px;
        border: 1.2px solid #ccc;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        // -webkit-transition: all .1s ease-in;
        // -moz-transition: all .1s ease-in;
        // transition: all .1s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
        border: 1px solid #409EFF;
        background-color: #409EFF;
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

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-add-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>

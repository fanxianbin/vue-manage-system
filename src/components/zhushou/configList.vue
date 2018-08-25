<template>
    <div class="config-list">
        <el-container>
            <el-main style="height:100%;padding-top:0">
                <el-header class="header-choose bg-white shadow-normal border-radius-8" style="height:100px;line-height: 100px;">
                    <span class="choose-label">选择城市:</span>
                    <el-select v-model="city">
                        <el-option v-for="ct in cities" :key="ct.cityCode" :value="ct.cityCode" :label="ct.cityName"></el-option>
                    </el-select>
                    <el-button type="primary" class="search">查看</el-button>
                </el-header>
                <div class="mt-20"></div>
                <el-footer style="height:300px;" class="config-info bg-white shadow-normal border-radius-8">
                    <div class="info">
                        <p>城市：<span v-text="cityInfo.cityName"></span></p>
                        <p>状态：<span v-text="status"></span></p>
                        <p v-text="mtimeDesc"></p>
                        <p v-text="muserNameDesc"></p>
                    </div>
                    <div class="mt-20"></div>
                    <div>
                        <span>
                            <el-button v-if="!cityInfo.status" type="primary">创建</el-button>
                            <el-button v-else type="primary">更新</el-button>
                        </span>
                        <span></span>
                        <span>
                            <el-button v-show="cityInfo.status == '1000100001'">发布</el-button>
                        </span>
                    </div>
                    <div class="erCode" v-show="cityInfo.status == '1000100001'">
                        <span class="item" v-text="saoyisaoText"></span>
                        <img class="item" src="/static/img/img.jpg"/>
                    </div>
                </el-footer>
            </el-main>
            <el-aside class="bg-white shadow-normal"></el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                city:'',
                cityInfo:{
                    id:123,
                    cityCode:'chengdu',
                    cityName:'成都',
                    status:'1000100001',
                    mtime:'2018-08-20 10:10:10',
                    muserName:'沈国庆'
                },
                cities:[
                    {
                        cityCode:'shanghai',
                        cityName:'上海'
                    },
                    {
                        cityCode:'beijing',
                        cityName:'北京'
                    },
                    {
                        cityCode:'chengdu',
                        cityName:'成都'
                    },
                ]
            }
        },
        computed:{
            status(){
                if(!this.cityInfo.status){
                    return "待创建";
                }else if(this.cityInfo.status == '1000100001'){
                    return "待发布";
                }else{
                    return "已发布";
                }
            },
            mtimeDesc(){
                if(!this.cityInfo.status){
                    return "";
                }else if(this.cityInfo.status == '1000100001'){
                    return "更新时间："+this.cityInfo.mtime;
                }else{
                    return "发布时间："+this.cityInfo.mtime;
                }
            },
            muserNameDesc(){
                if(!this.cityInfo.status){
                    return "";
                }else if(this.cityInfo.status == '1000100001'){
                    return "更新人："+this.cityInfo.muserName;
                }else{
                    return "发布人："+this.cityInfo.muserName;
                }
            },
            saoyisaoText(){
                if(this.cityInfo.status == '1000100001'){
                    return "扫一扫预览："
                }else{
                    return "扫一扫访问：";
                }
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .choose-label{
        margin-right:30px;
    }
    .search{
        margin-left:20px;
    }
    .config-info{
        position: relative;

        .info{
            height:200px;

            p{
                padding-top:20px;
                height:30px;
            }
        }
    }
    .erCode{
        position: absolute;
        top:20px;
        right:60px;
        
        .item{
            vertical-align:text-top;
        }
    }
</style>
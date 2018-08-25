<template>
    <div class="config">
        <el-container>
            <el-main style="height:100%;padding-top:0">
                <el-header style="padding:0;height:40px;line-height: 40px;">
                    <span>城市:{{cityInfo.cityName}}</span>
                    <div class="operation">
                        <el-button class="search">取消</el-button>
                        <el-button type="primary" class="search" v-text="saveBtnDesc"></el-button>
                    </div>
                </el-header>
                <div class="mt-10"></div>
                <el-footer style="height:100%" class="config-info bg-white shadow-normal border-radius-8">
                    <div class="app-config">
                        <p>应用配置</p>
                    </div>
                    <div class="config-detail">
                        <div class="item" :key="app.name" v-for="app in configInfo">
                            <el-checkbox class="checkbox" v-model="app.checked">{{app.name}}</el-checkbox>
                            <el-input class="app-url" size="mini" clearable v-show="app.checked" v-model="app.appUrl"></el-input>
                            <span class="tip" v-show="app.checked">
                                <i class="el-icon-check" v-show="app.appUrl && !app.invalidUrl"></i>
                                <span v-show="!app.appUrl">必填</span>
                                <span v-show="app.invalidUrl">无效链接</span>
                            </span>
                        </div>
                    </div>
                </el-footer>
            </el-main>
            <el-aside class="bg-white shadow-normal"></el-aside>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
        return{
            cityInfo:{
                id:123,
                cityCode:'chengdu',
                cityName:'成都',
                status:'1000100001',
                mtime:'2018-08-20 10:10:10',
                muserName:'沈国庆'
            },
            configInfo:[
                {
                    name:'交易查询'
                },{
                    name:'交易代办'
                },{
                    name:'常用信息'
                },{
                    name:'贷款计算器'
                },{
                    name:'税费精算'
                },{
                    name:'权属认定'
                },{
                    name:'评估询值'
                },{
                    name:'首二套认定'
                }
            ],
            cityConfig:{

            }
        }
    },
    computed:{
        saveBtnDesc(){
            if(this.cityInfo.status == '1000100002'){
                return "重新发布";
            }else{
                return "暂存";
            }

        }
    }
}
</script>
<style lang="scss" scoped>
    .operation{
        float: right;
    }
    .app-config{
        padding-top:15px;
    }
    .config-detail{
        margin: 20px 0;
    }
    .config-detail .item{
        height:40px;
        line-height: 40px;
        .checkbox{
            width:100px;
        }

        .app-url{
            width:300px;
        }

        .tip{
            color:green;
        }
    }
</style>



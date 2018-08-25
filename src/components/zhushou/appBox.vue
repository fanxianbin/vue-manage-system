<template>
    <div class="app-box clearfix">
        <a :key="app.name" :href="app.appUrl" v-for="app in configInfo.config">
            <em :style="'background-image: url('+app.iconUrl+')'"></em>
            <span>{{app.name}}</span>
        </a>
    </div>
</template>
<script>
export default {
    data(){
        return{
            configInfo:{
                id:123,
                cityCode:"chengdu",
                cityName:"成都",
                status:1000100001,
                mtime:'2018-12-12 12:12:12',
                muserName:"沈国庆",
                config:[
                    {
                        name:"交易在途",
                        appUrl:"https://sh.ke.com/toBeingFollow",
                        iconUrl:'/static/img/img.jpg'
                    },{
                        name:"税费精算",
                        appUrl:"https://sh.ke.com/taxActuarial",
                        iconUrl:'/static/img/img.jpg'
                    },{
                        name:"常用信息",
                        appUrl:"https://sh.ke.com/toBeingFollow",
                        iconUrl:'/static/img/img.jpg'
                    },{
                        name:"交易代办",
                        appUrl:"https://sh.ke.com/taxActuarial",
                        iconUrl:'/static/img/img.jpg'
                    },{
                        name:"首二套认定",
                        appUrl:"https://sh.ke.com/taxActuarial",
                        iconUrl:'/static/img/img.jpg'
                    }
                ]
            }
        }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
    .app-box a{
        float: left;
        display: block;
        text-align: center;
        width: 24%;
        margin-bottom: 10px;
    }
    .app-box a em{
        display: inline-block;
        vertical-align: top;
        width: 50px;
        height:50px;
        border-radius: 25px;
        border:1px solid #ccc;
        background-size: 50px;
    }
    .app-box a span{
        display: block;
        font-size: 14px;
        color: #333333;
        text-align: center;
    }
</style>


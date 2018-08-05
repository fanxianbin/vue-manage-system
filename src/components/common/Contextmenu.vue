<template>
  <span class="v-contextmenu-wrapper" :class="'v-contextmenu-' + contextmenuData.menuName" 
    :style="'width:'+width">
    <li v-for="item in contextmenuData.menulist" :key="item.text" class="context-menu-list">
      <div @click.stop="handler(item)">
        <span :style="'padding-left:'+leftPadding">{{item.text}}</span>
      </div>
    </li>
  </span>
</template>
<script>
  export default {
    props: {
      contextmenuData: {
        type: Object,
        requred: false,
        default () {
          return {
            menuName: null,
            attachData: null,
            paddingLeft: null,
            width:null,
            axios: {
              x: null,
              y: null
            },
            menulist: [{
                command: 'closeCurr',
                icon: null,
                text: '关闭标签页'
            }]
          }
        }
      }
    },
    computed:{
      leftPadding(){
        if(!this.contextmenuData.paddingLeft){
          return "20px"
        }else{
          return this.contextmenuData.paddingLeft
        }
      },
      width(){
        if(!this.contextmenuData.width){
          return "135px"
        }else{
          return this.contextmenuData.width
        }
      }
    },
    watch: {
      'contextmenuData.axios' (val) {
        var x = val.x
        var y = val.y
        var menuName = 'v-contextmenu-' + this.contextmenuData.menuName
        var menu = document.getElementsByClassName(menuName)[0];
        menu.style.display = 'block'
        if(x+menu.offsetWidth>window.innerWidth){
          x = window.innerWidth - menu.offsetWidth;
        }
        if(y+menu.offsetHeight>window.innerHeight){
          y = window.innerHeight - menu.offsetHeight;
        }
        menu.style.left = x + 'px'
        menu.style.top = y + 'px'
        document.addEventListener('mouseup', function () {
          menu.style.display = 'none'
        }, false)
      }
    },
    methods: {
      handler(item) {
        this.$emit("e-contextmenu-"+this.contextmenuData.menuName,
          {command:item.command,attachData:this.contextmenuData.attachData}
        );
      }
    }
  }
</script>
<style>
  .v-contextmenu-wrapper {
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    padding:1.8px 0;
    color:#000;
    background-color: #fff;
    border:1px solid #ccc;
    font-size:12px;
  }
  .v-contextmenu-wrapper .context-menu-list {
    height: 26px;
    line-height: 26px;
    text-decoration: none;
    list-style: none;
  }
  .v-contextmenu-wrapper .context-menu-list div {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    outline: 0;
    border: 0;
  }
  .v-contextmenu-wrapper .context-menu-list div:hover {
    background-color: #eee;
  }
</style>
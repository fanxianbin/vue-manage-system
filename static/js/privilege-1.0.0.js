//使用时请先在静态页面中引入Vue和jquery
Vue.directive('privilegePoint', function (el, binding) {
    let map = window.privilegeMap;
    let point = binding.value.split(",");
    for(let p of point){
        if(!map[p]){
            $(el).hide();
            break;
        }
    }
});
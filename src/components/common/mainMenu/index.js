import dealCenter from './dealCenter.js';
import msgCenter from './msgCenter.js';
import orderManager from './orderManager.js';
import workplat from './workplat.js';
let mainMenu = [
    dealCenter,
    msgCenter,
    orderManager,
    workplat
];
let pathList = [];
let initPathList =()=>{
    for(let menu of mainMenu){
        let items = menu.items;
        for(let item of items){
            if(item.subItems){
                for(let sub of item.subItems){
                    if(pathList.indexOf(item.index+sub.index) != -1){
                        throw Error("路由地址重复:"+(item.index+sub.index));
                    }else{
                        pathList.push(item.index+sub.index);
                    }
                }
            }else{
                if(pathList.indexOf(item.index) != -1){
                    throw Error("路由地址重复:"+item.index);
                }else{
                    pathList.push(item.index);
                }
            }
        }
    }
}
initPathList();
let isPathInMenu =(path)=>{
    return pathList.indexOf(path) > -1;
}
export default {
    mainMenu,
    isPathInMenu
}
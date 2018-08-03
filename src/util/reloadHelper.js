import store from '@/store'
let reload = (name)=>{
    let tagList = store.state.tagList;
    for(let tag of tagList){
        if(tag.name === name){
            return !tag.reload;
        }
    }
}
export default {
    reload
}
import store from '@/store'
let reload = (name)=>{
    let tagsList = store.state.tagsList;
    for(let tag of tagsList){
        if(tag.name === name){
            console.log(tag);
            return !tag.reload;
        }
    }
}
export default {
    reload
}
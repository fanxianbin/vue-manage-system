let mutations = {

    setMainMenuActiveIndex(state,index){
        state.mainMenuActiveIndex = index;
        console.log(state.mainMenuActiveIndex);
    },
    setMainMenuItemCollapse(state){
       state.mainMenuItemCollapse = !state.mainMenuItemCollapse; 
    },
    setPagePosition(state,position){
        state.pagePosition = position;
    }

}

export default mutations

let mutations = {

    setMainMenuActiveIndex(state,index){
        state.mainMenuActiveIndex = index;
    },
    setMainMenuItemCollapse(state){
       state.mainMenuItemCollapse = !state.mainMenuItemCollapse; 
    },
    setPagePosition(state,position){
        state.pagePosition = position;
    },
    pushTagsList(state,route){
    	let tag = state.tagsList.some(item => {
	        if(item.path === route.fullPath){
	            return item;
	        }
	    });
	    if(!tag){
	        // if(this.tagsList.length >= 8){
	        //     this.tagsList.shift();
	        // }
	        state.tagsList.push({
	            title: route.meta.title,
	            path: route.fullPath,
	            name: route.matched[1].components.default.name,
				position:0,
				reload:false
	        });
	    }
    }
    
    
}

export default mutations

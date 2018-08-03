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
    pushTagList(state,route){
    	let isExist = state.tagList.some(item => {
	        if(item.path === route.fullPath){
	            return item;
	        }
	    });
	    if(!isExist){
	        // if(this.tagList.length >= 8){
	        //     this.tagList.shift();
	        // }
	        state.tagList.push({
	            title: route.meta.title,
	            path: route.fullPath,
	            name: route.matched[1].components.default.name,
				position:0
	        });
	    }
    },
    removeTag(state,index){
        state.tagList.splice(index, 1)[0];
	},
	setTagPosition(state,param){
		let path = param.path;
		let position = param.position;
		for(let tag of state.tagList){
			if(tag.path == path){
				tag.position = position;
			}
		}
	}
}

export default mutations

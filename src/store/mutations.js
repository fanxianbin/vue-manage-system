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
	        if(item.path === route.path){
	            return item;
	        }
		});
		// debugger;
	    if(!isExist){
	        // if(this.tagList.length >= 8){
	        //     this.tagList.shift();
	        // }
	        state.tagList.push({
	            title: route.meta.title,
	            path: route.path,
	            name: route.matched[1].components.default.name,
				position:0
	        });
	    }
    },
    removeTag(state,index){
        state.tagList.splice(index, 1);
	},
	removeTagBefore(state,index){
		state.tagList.splice(0,index);
	},
	removeTagAfter(state,index){
		state.tagList.splice(index+1,state.tagList.length);
	},
	resetTagList(state,tagList){
		state.tagList = tagList;
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

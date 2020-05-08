import * as ActionTypes from './ActionTypes'

export const Dishes = ( state = {isLoading:true,errMsg:null,dishes:[]} ,action ) => {
    switch(action.type){
        case ActionTypes.DISHES_LOADING:
            //...state mean this is a spread operator in ES6 JS so in that situation we just append all orignal state
            // then after , we just update this field according to the case true
            return {...state, isLoading:true,errMsg:null,dishes:[]};
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading:false,errMsg:null,dishes:action.payload};
        case ActionTypes.DISHES_FAILED:
            return {...state , isLoading:false,errMsg:action.payload};

        default:
            return state;
    }
}
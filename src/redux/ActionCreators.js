import * as ActionTypes from './ActionTypes'
import {DISHES} from '../shared/dishes'
import { baseUrl } from '../shared/baseUrl'


//---------------This is for fetching Comments from Json-Server

export const addComment = (comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : comment
});
export const postComment = (dishId,rating,author,comment) => (dispatch) => {
    const newComment={
        dishId : dishId,
        rating:rating,
        author:author,
        comment:comment
    }
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments',{
        method:'POST',
        body:JSON.stringify(newComment),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error : ' + response.status + ' ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log("Post Comment " + error.message);
        alert('Your comment could not be posted \n Error: ' + error.message);
    });

};

//---------------This is for fetching Dishes from Json-Server

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error : ' + response.status + ' ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}
export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING
});
export const dishesFailed = (errmsg) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errmsg
});
export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
});

//---------------This is for fetching Comments from Json-Server

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error : ' + response.status + ' ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}
export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
});
export const commentsFailed = (errMsg) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload : errMsg
});

//---------------This is for fetching Promotions from Json-Server

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error : ' + response.status + ' ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}
export const promosLoading = () => ({
    type:ActionTypes.PROMOS_LOADING
});
export const promosFailed = (errMsg) => ({
    type:ActionTypes.PROMOS_FAILED,
    payload:errMsg
});
export const addPromos = (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});

//---------------This is for fetching Leaders from Json-Server

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseUrl + 'leaders')
        .then(response => {
                if(response.ok){
                    return response;
                }else{
                    var error = new Error('Error: ' + response.status + ' ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errMsg = new Error(error.message);
                throw errMsg;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}
export const leadersLoading = () => ({
    type:ActionTypes.LEADERS_LOADING
});
export const addLeaders = (leaders) => ({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
});
export const leadersFailed = (errMsg) => ({
    type:ActionTypes.LEADERS_FAILED,
    payload:errMsg
});

//This is for POSTING FeedBack on server

export const postFeedback = (firstname,lastname,telnum,email,contactType,message) => (dispatch) => {
    const newFeedback={
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        contactType:contactType,
        message:message,
    }
    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl + 'feedback',{
        method:'POST',
        body:JSON.stringify(newFeedback),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error : ' + response.status + ' ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error => {
        console.log("Post FeedBack " + error.message);
        alert('Your FeedBack could not be posted \n Error: ' + error.message);
        dispatch(feedbackFailed(error.message));
    });

};
export const addFeedback = (feedback) => ({
    type:ActionTypes.ADD_FEEDBACKS,
    payload:feedback
});
export const feedbackFailed = (errMsg) => ({
    type:ActionTypes.FEEDBACKS_FAILED,
    payload:errMsg
});
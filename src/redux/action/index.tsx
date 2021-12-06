import * as ActionTypes  from "../contants/action-type";

// isLogin
export interface PropsIsLogin {
    type: ActionTypes.SET_STATE_LOGIN;
    isLogin: boolean;
}
export const stateLogin = (isLogin: boolean): PropsIsLogin => ({
    type: ActionTypes.SET_STATE_LOGIN,
    isLogin,
 });

 // userName
 export interface PropsUserName {
    type: ActionTypes.SET_STATE_USER;
    userName: string;
}
export const stateUser = (userName: string): PropsUserName => ({
    
    type: ActionTypes.SET_STATE_USER,
    userName,
});

export type Paging = {
    page: number;
    size: number;
}
// paging
export interface PropsPaging {
    type: ActionTypes.SET_STATE_PAGING;
    paging: Paging 
    // {
    //     page: number;
    //     size: number;
    // };
}
export const setStatePagingTable = (paging: Paging) => ({
    type: ActionTypes.SET_STATE_PAGING,
    paging: {
        page: paging.page,
        size: paging.size
    },
});

// categoryId
export interface PropsCategoryId {
    type: ActionTypes.SET_CATEGORY_ID;
    categoryId: string;
}
export const setCategoryId = (categoryId: string): PropsCategoryId => ({
    type: ActionTypes.SET_CATEGORY_ID,
    categoryId,
});

// category
export interface PropsCategory {
    type: ActionTypes.SET_CATEGORY;
    category: Object;
}
export const setCategory = (category: Object): PropsCategory => ({
    type: ActionTypes.SET_CATEGORY,
    category,
});

// categoryList
export interface PropsCategoryList {
    type: ActionTypes.SET_CATEGORY_LIST,
    categoryList: Object;
}
export const setCategoryList = (categoryList: Object): PropsCategoryList => ({
    type: ActionTypes.SET_CATEGORY_LIST,
    categoryList,
});

export type ComboWombo = (PropsCategoryList | PropsCategory | PropsCategoryId | PropsPaging | PropsUserName);


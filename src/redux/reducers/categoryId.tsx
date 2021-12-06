import { AnyAction } from "redux";
import * as ActionTypes  from "../contants/action-type";

const initialState = {
    categoryId: [],
}

const categoryId = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.SET_CATEGORY_ID:
            return {
                ...state,
                categoryId: action.categoryId,  
              };
        default:
            return state;
    }
};

export default categoryId;
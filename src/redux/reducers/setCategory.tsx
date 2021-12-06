import { AnyAction } from "redux";
import * as ActionTypes  from "../contants/action-type";

const initialState = {
    category: [],
};

const category = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.SET_CATEGORY:
            return {
                ...state,
                category: action.category,  
              };
        default:
            return state;
    }
};

export default category;
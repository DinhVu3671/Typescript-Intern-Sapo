import { AnyAction } from "redux";
import { ComboWombo } from "../action";
import * as ActionTypes  from "../contants/action-type";

interface CategoryListInit {
    categoryList: object;
  }
const initialState: CategoryListInit = {
    categoryList: [],
}

const categoryList = (state = initialState, action: ComboWombo) => {
    switch (action.type) {
        case ActionTypes.SET_CATEGORY_LIST:
            return {
                ...state,
                categoryList: action.categoryList,  
              };
        default:
            return state;
    }
};

export default categoryList;
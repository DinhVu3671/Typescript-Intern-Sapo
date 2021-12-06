import { AnyAction } from "redux";
import { ComboWombo } from "../action";
import * as ActionTypes  from "../contants/action-type";

interface PagingInit {
    paging: {
        page: number;
        size: number;
    };
  };
const initialState:PagingInit = {
    paging : {
        page: 1,
        size: 5
    },
};

const setStatePaging = (state = initialState, action: ComboWombo) => {
    switch (action.type) {
        case ActionTypes.SET_STATE_PAGING:
            return {
                ...state,
                paging: action.paging,  
              };
        default:
            return state;
    }
};

export default setStatePaging;
import { Action, AnyAction } from "redux";
import { ComboWombo } from "../action";
import * as ActionTypes  from "../contants/action-type";

interface UserInit {
    userName: string
  }
const initialState: UserInit = {
    userName: "",
}

const setStateUser = (state = initialState, action: ComboWombo) => {
    switch (action.type) {
        case ActionTypes.SET_STATE_USER:
            return {
                ...state,
                userName: action.userName,  
              };
        default:
            return state;
    }
};

export default setStateUser;
import { combineReducers } from 'redux';

import setStateLogin from './stateLogin';
import setStateUser from './stateUser';
import setStatePaging from './statePaging';
import categoryId from './categoryId';
import category from './setCategory';
import categoryList from './categoryList';


const rootReducer = combineReducers({
    stateLogin: setStateLogin,
    setStateUser,
    setStatePaging,
    categoryId,
    category,
    categoryList,
})
export default rootReducer; 
export type RootState = ReturnType<typeof rootReducer>
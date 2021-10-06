import {combineReducers} from "redux";
import {bookReducer} from "./bookReducer";
import {selectReducer} from "./selectReducer";


const rootReducer = combineReducers({
    books: bookReducer,
    select: selectReducer,
})
export {rootReducer}
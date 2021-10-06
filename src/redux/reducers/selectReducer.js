import {SELECT_CATEGORY} from "../types";

const defaultState = {sortedType: 'relevance', filterType: 'all'}
const selectReducer = (state = defaultState, action) => {
    if (action.type === SELECT_CATEGORY) {
        console.log(action.payload)
        return {...state, [action.payload.type]: action.payload.value}
    }
    return state
}
export {selectReducer}
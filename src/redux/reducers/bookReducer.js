import {CHOOSE_BOOK, HIDE_BOOKS, LOAD_BOOKS, LOAD_MORE_BOOKS, SHOW_BOOKS} from "../types";

const defaultState = {data: [], totalItems: null, chosenBook: null, isLoading: true}

const bookReducer = (state = defaultState, action) => {
    if (action.type === LOAD_BOOKS) {
        return {...state, data: action.payload.items, totalItems: action.payload.totalItems}
    }
    else if (action.type === LOAD_MORE_BOOKS) {
        return {...state, data: [...state.data, ...action.payload.items]}
    }
    else if (action.type === CHOOSE_BOOK) {
        const chosenBook = state.data.filter(item => item.id === action.payload)[0];
        return {...state, chosenBook}
    }
    else if (action.type === SHOW_BOOKS) {
        return {...state, isLoading: false}
    }
    else if (action.type === HIDE_BOOKS) {
        return {...state, isLoading: true}
    }
    return state
}
export {bookReducer}
import {CHOOSE_BOOK, HIDE_BOOKS, LOAD_BOOKS, LOAD_MORE_BOOKS, SELECT_CATEGORY, SHOW_BOOKS} from "./types";

export const loadBooks = (data) => {
    return {type: LOAD_BOOKS, payload: data}
}
export const loadMoreBooks = (data) => {
    return {type: LOAD_MORE_BOOKS, payload: data}
}
export const selectCategory = (value, type) => {
    return {type: SELECT_CATEGORY, payload: {value, type}}
}
export const chooseBook = (id) => {
    return {type: CHOOSE_BOOK, payload: id}
}
export const showBooks = () => {
    return {type: SHOW_BOOKS}
}
export const hideBooks = () => {
    return {type: HIDE_BOOKS}
}


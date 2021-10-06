import {useEffect} from "react";
import {api_key} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {hideBooks, loadBooks, loadMoreBooks, showBooks} from "../../redux/actions";
import BookCard from "./BookCard/BookCard";

import styles from './BooksCards.module.css'
import axios from "axios";
import Loader from "../Loader/Loader";

const BooksCards = (props) => {
    const books = useSelector(state => state.books.data);
    const totalItems = useSelector(state => state.books.totalItems);
    const isLoading = useSelector(state => state.books.isLoading);

    const filterType = useSelector(state => state.select.filterType);
    const sortedType = useSelector(state => state.select.sortedType);
    const {loadedPages, booksPerPage, pathName, inputValue} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            if (pathName.current !== '/') {
                return
            }
            const url = `https://www.googleapis.com/books/v1/volumes?q=startIndex=0&maxResults=${booksPerPage}&key=${api_key}`;
            const res = await fetch(url);
            const json = await res.json();
            dispatch(loadBooks(json));
            dispatch(showBooks())
        })()
    }, [])

    useEffect(() => {
        pathName.current = window.location.pathname
    }, [pathName])

    const onClickLoadMoreBooks = async () => {
        dispatch(hideBooks())
        loadedPages.current += 1;
        const startIndex = loadedPages.current * booksPerPage - booksPerPage;
        let url = 'https://www.googleapis.com/books/v1/volumes?q=';
        if (inputValue === '') {
            url = filterType === 'all'
                ? `${url}orderBy=${sortedType}&startIndex=${startIndex}&maxResults=${booksPerPage}&key=${api_key}`
                : `${url}subject:${filterType}&orderBy=${sortedType}&startIndex=${startIndex}&maxResults=${booksPerPage}&key=${api_key}`

        } else {
            url = filterType === 'all'
                ? `${url}${inputValue}&orderBy=${sortedType}&startIndex=${startIndex}&maxResults=${booksPerPage}&key=${api_key}`
                : `${url}${inputValue}+subject:${filterType}&orderBy=${sortedType}&startIndex=${startIndex}&maxResults=${booksPerPage}&key=${api_key}`
        }
        const res = await fetch(url);
        const json = await res.json();
        dispatch(loadMoreBooks(json));
        dispatch(showBooks());
    }

    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            <div className={styles.totalItems}>Found {totalItems} results</div>
            <ul className={styles.cardsWrap}>
                {books.map((book, ind) => <BookCard book={book} key={ind}/>)}
            </ul>
            <div className={styles.loadWrap}>
                <span onClick={onClickLoadMoreBooks}>Load more</span>
            </div>
        </>


    )
}
export default BooksCards
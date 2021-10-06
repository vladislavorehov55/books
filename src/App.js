import {useRef, useState} from "react";
import {Route} from "react-router-dom";
import BooksCards from "./components/BooksCards/BooksCards";
import SelectBlock from "./components/SelectBlock/SelectBlock";
import loupe from './images/loupe.png';
import styles from './App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {api_key} from "./constants";
import {loadBooks} from "./redux/actions";
import BookInfo from "./components/BookInfo/BookInfo";


const App = () => {
    const filterType = useSelector(state => state.select.filterType);
    const sortedType = useSelector(state => state.select.sortedType);
    const [inputValue, setInputValue] = useState('');
    const loadedPages = useRef(1);
    const pathName = useRef('/');
    const booksPerPage = 30;
    const dispatch = useDispatch();

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }
    const searchBooks = async () => {
        loadedPages.current = 1;
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
        const res = await fetch(url)
        const json = await res.json();
        dispatch(loadBooks(json));
    }
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Search for book</h1>
            <div className={styles.inputSearchWrap}>
                <input placeholder='Поиск' className={styles.inputSearch} onChange={onChangeInput} value={inputValue}/>
                <img src={loupe} alt="search-icon" className={styles.searchImg} onClick={searchBooks}/>
            </div>
            <div className={styles.selectsWrap}>
                <SelectBlock options={['relevance', 'newest']} type='sortedType'/>
                <SelectBlock options={['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']}
                             type='filterType'/>
            </div>

            <Route exact path='/'
                   render={() => <BooksCards loadedPages={loadedPages} booksPerPage={booksPerPage}
                                             inputValue={inputValue}
                                             pathName={pathName}/>}
            />
            <Route path='/:id'
                   render={() => <BookInfo pathName={pathName}/>}/>


        </div>
    )
}
export default App
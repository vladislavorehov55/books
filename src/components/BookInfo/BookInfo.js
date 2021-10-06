import {useSelector} from "react-redux";
import styles from './BookInfo.module.css'
import {useEffect} from "react";
const BookInfo = ({pathName}) => {

    const chosenBook = useSelector(state => state.books.chosenBook);

    useEffect(() => {
        pathName.current = window.location.pathname;
    }, [pathName])

    return (
        <div className={styles.wrap}>
            <div className={styles.imgWrap}>
                {
                    chosenBook.volumeInfo.imageLinks
                        ? <img className={styles.img} src={chosenBook.volumeInfo.imageLinks.thumbnail} alt='book-img'/>
                        : <span>No image</span>
                }
            </div>

            <div>
                <div className={styles.category}>{chosenBook.volumeInfo.categories.join('/')}</div>
                <div className={styles.title}>{chosenBook.volumeInfo.title}</div>
                {
                    chosenBook.volumeInfo.description &&
                    <div className={styles.descr}>{chosenBook.volumeInfo.description}</div>

                }
            </div>
        </div>
    )
}
export default BookInfo
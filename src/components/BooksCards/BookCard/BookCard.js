import {Link} from "react-router-dom";
import styles from './BookCard.module.css';
import {useDispatch} from "react-redux";
import {chooseBook} from "../../../redux/actions";
const BookCard = (props) => {
    const {book} = props;
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(chooseBook(book.id));
    }
    return (
        <li className={styles.card} onClick={onClick}>
            <Link to={`/${book.id}`} className={styles.link}>
                <div className={styles.imgWrap}>
                    {
                        book.volumeInfo.imageLinks &&
                        <img className={styles.img} src={book.volumeInfo.imageLinks.thumbnail} alt="book-img"/>
                    }
                </div>
                {
                    book.volumeInfo.categories &&
                    <div className={styles.category}>{book.volumeInfo.categories[0]}</div>
                }
                <div className={styles.title}>{book.volumeInfo.title}</div>
                {
                    book.volumeInfo.authors &&
                    <div className={styles.authors}>{book.volumeInfo.authors.join(',')}</div>
                }
            </Link>
        </li>
    )
}
export default BookCard
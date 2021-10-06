import {useDispatch, useSelector} from "react-redux";
import {selectCategory} from "../../redux/actions";
import styles from './SelectBlock.module.css'
const SelectBlock = ({options, type}) => {
    const value = useSelector(state => type === 'sortedType' ? state.select.sortedType : state.select.filterType);
    const dispatch = useDispatch();
    const selectItem = (e) => {
        dispatch(selectCategory(e.target.value, type))
    }
    return (
        <div className={styles.wrap}>
            <span className={styles.title}>{type === 'sortedType' ? 'Sorting by' : 'Categories'}</span>
            <select value={value} onChange={selectItem}>
                {
                    options.map((option, ind) => <option key={ind} value={option}>{option}</option>)
                }
            </select>
        </div>

    )
}
export default SelectBlock
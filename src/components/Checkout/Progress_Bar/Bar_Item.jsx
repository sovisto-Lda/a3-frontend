import styles from './Progress_Bar.module.css';
import check from '../../../assets/images/check_icon.svg'

export default function BarItem({name, number, stage}) {
    const completed = (number < stage)
    const active = (number === stage)

    const highlight = completed || active

    return (
        <div className={`w-100 text-center d-flex flex-column gap-3`}>
            <h2 className={`${highlight ? styles.completed_green_h2 : ''} ${styles.h2}`}>{name}</h2>
            <div className={`d-flex align-items-center`}>
                <div className={`${styles.progress_line}  ${highlight ? styles.completed_green_line : ''}`}></div>
                <div className={`${styles.progress_number_wrapper}  ${highlight ? styles.completed_green_number_wrapper : ''}`}>
                    {completed ? <img src={check} alt="" /> : number}
                </div>
                <div className={`${styles.progress_line}  ${highlight ? styles.completed_green_line : ''}`}></div>
            </div>
        </div>
    )

}
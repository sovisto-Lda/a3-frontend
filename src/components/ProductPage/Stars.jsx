import styles from './ProductMain.module.css';

export default function Stars({perc=0, num_ratings=0, showCount=true, height="25px"}) {
    return (
        <div className='d-flex align-items-center gap-3 mt-0 mb-0'>
            <div className={styles.starsDiv} style={{height: height, width: `calc(${height} * 5)`}}>
                <div className={styles.stars1}
                    // FILL STARS BY %
                    style={{width: perc + "%"}}>
                </div>
            </div>

            {(showCount &&
            <p className="m-0">{`${num_ratings} Avaliações`}</p>
            )}
        </div>
    );
}
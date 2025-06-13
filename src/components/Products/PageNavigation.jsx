import styles from './PageNavigation.module.css'
import LeftArrow from '../../assets/images/left_arrow.svg'
import RightArrow from '../../assets/images/right_arrow.svg'

export default function PageNavigation ({page, totalPages, handlePageChange}) {
    return (
        <div className="d-flex gap-1">
            <img src={LeftArrow} alt="" 
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                style={{cursor: "pointer"}}
            />
            {Array.from({ length: totalPages > 6 ? 4 : totalPages }).map((_, index) => (
            <div
                className="primary-button"
                style={{
                width: "48px", 
                height: "48px",
                backgroundColor: page === index + 1 ? "var(--cinzento)" : "transparent",
                color: page === index + 1 ? "var(--branco)" : "var(--preto)",
                fontWeight: "600"
                }}
                key={index}
                onClick={() => handlePageChange(index + 1)}
            >
                {index + 1}
            </div>
            ))}

            {totalPages > 6 && 
            <>
                <div className='primary-button' style={{fontWeight: "600", backgroundColor: "transparent", color: "var(--preto)", paddingBottom: "16px"}}>...</div>
                <div
                className="primary-button"
                style={{
                    width: "48px", 
                    height: "48px",
                    backgroundColor: page === totalPages ? "var(--cinzento)" : "transparent",
                    color: page === totalPages ? "var(--branco)" : "var(--preto)",
                    fontWeight: "600"
                }}
                onClick={() => handlePageChange(totalPages)}
                >
                {totalPages}
                </div>
            </>
            }
            <img src={RightArrow} alt="" 
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                style={{cursor: "pointer"}}
            />

        </div>

    )
}
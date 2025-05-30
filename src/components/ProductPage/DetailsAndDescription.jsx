import styles from './ProductMain.module.css';
import React, { useEffect, useState, useRef } from "react";

export default function DetailsAndDescription({description, details}) {

    const [cardSelected, setCardSelected] = useState(0);

    const descriptionContentRef = useRef(null);
    const detailsContentRef = useRef(null);

    const detailsSelectorRef = useRef(null);
    const descriptionSelectorRef = useRef(null);


    function handleClickDescription() {
        setCardSelected(0)
    }

    function handleClickDetails() {
        setCardSelected(1)
    }

    useEffect(() => {
        if (cardSelected === 1) {
            descriptionContentRef.current.style.display = "none"
            detailsContentRef.current.style.display = "flex"

            descriptionSelectorRef.current.style.backgroundColor = "var(--cinzento-muito-claro)"
            detailsSelectorRef.current.style.backgroundColor = "black"
        }
        else {
            descriptionContentRef.current.style.display = "flex"
            detailsContentRef.current.style.display = "none"

            descriptionSelectorRef.current.style.backgroundColor = "black"
            detailsSelectorRef.current.style.backgroundColor = "var(--cinzento-muito-claro)"
        }
    }, [cardSelected])

    return (
        <div className='d-flex flex-column gap-2 mt-2 mb-2'>
            {/* selectors */}
            <div className='d-flex'>
                {/* description selector */}
                <div className='w-100'
                style={{cursor:"pointer"}}
                onClick={handleClickDescription}
                >
                    <p className={styles.description_details_text}>Descrição</p>
                    <div style={{width: "100%", height: "1.5px", backgroundColor: "black"}} ref={descriptionSelectorRef}></div>
                </div>

                {/* details selector */}
                <div className='w-100'
                style={{cursor:"pointer"}}
                onClick={handleClickDetails}
                >
                    <p className={styles.description_details_text}>Detalhes</p>
                    <div style={{width: "100%", height: "1.5px", backgroundColor: "black"}} ref={detailsSelectorRef}></div>
                </div>
            </div>

            <p className={styles.description_details_text} ref={descriptionContentRef}>{description}</p>
            <p className={styles.description_details_text} ref={detailsContentRef}>{details}</p>
        </div>
    )

}
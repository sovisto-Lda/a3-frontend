import styles from './ProductMain.module.css';
import React, { useEffect, useState, useRef } from "react";

export default function ImagesCarousel({images}) {

    useEffect(() => {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    }, [images]);

    return (
        <div
        id="imageCarousel"
        className={`carousel slide`}
        data-bs-ride="false"
        style={{
            width: "100%",
            height: "100%",
            maxWidth: "80vh",
            aspectRatio: '1 / 1',
            overflow: 'hidden', 
            borderRadius:"4px" }}
        >
            {/* Indicators */}
            <div className="carousel-indicators">
                {images.map((image, index) => (
                    <button 
                    key={index}
                    style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '100%',
                        backgroundColor: '#FFF'
                    }}
                    type="button" data-bs-target="#imageCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current="true" aria-label={`Slide ${index}`} />
                ))}
            </div>

            {/* Carousel items */}
            <div className="carousel-inner w-100 h-100">
                {images.map((image, index) => (
                    <div
                    key={index}
                    className={`carousel-item h-100 w-100 ${index === 0 ? 'active' : ''} ${styles.carouselItem}`}
                    >
                    <img
                        src={image}
                        className="d-block w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt={`Slide ${index}`}
                    />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
            </button>

        </div>
    )

}
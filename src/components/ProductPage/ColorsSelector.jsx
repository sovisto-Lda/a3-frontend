import styles from './ProductMain.module.css';

export default function ColorsSelector ({colors, selectedColor, setSelectedColor}) {



    function ColorToCode(color) {
        const Color = color.toLowerCase()
        const colors = {"grey": "#666666", "blue": "#0b5ee3", "pink": "#f08996" }
        
        return colors[Color]
    }

    return (

        <div className='d-flex gap-1'>
            {colors.map((color, index) => (
                <div 
                key={index}
                className={`${styles.color_circle}`}
                style={{
                    backgroundColor: ColorToCode(color), 
                    cursor: "pointer",
                    border: (selectedColor === color) ? "3px solid var(--cinzento-claro)" : ""
                }}
                onClick={() => {{setSelectedColor(color)}}}
                ></div>

            ))}
        </div>
    )

}
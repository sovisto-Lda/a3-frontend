import general from './general.module.css';

export default function PrinterImg() {
    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <div>
            <div 
                className={general.fullWidthImage}
                style={{
                    backgroundImage: `url("${import.meta.env.VITE_API_URL}/images/printer_bg.jpg")`,
                    backgroundPosition: "center 60%",
                    height: "20vw"
                }}>           

            </div>
        </div>

          
        
    )
}
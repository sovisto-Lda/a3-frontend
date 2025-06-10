import general from './general.module.css';

export default function PrinterImg() {
    return (
        <div>
            <div 
                className={general.fullWidthImage}
                style={{
                    backgroundImage: 'url("http://localhost:5000/images/printer_bg.jpg")',
                    backgroundPosition: "center 60%",
                    height: "20vw"
                }}>           

            </div>
        </div>

          
        
    )
}
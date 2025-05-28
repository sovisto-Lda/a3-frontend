import delete_icon from '../../../assets/images/delete.svg';

export default function ProductCard() {
    return (
        <div className='d-flex align-items-center'>
            <div className='d-flex flex-grow-1'>
                <img src="http://localhost:5000/images/shark.jpg" alt="" style={{height: '80px'}}/>
                <div className='d-flex flex-column align-items-start justify-content-center'>
                    <p>Tubarão #12</p>
                    <p>Azul</p>
                </div>
            </div>

            <p className='col-4 text-center'>2</p>

            <p className="col-2 text-center">11.99€</p>

            <div  className="col-2 text-end" >
                <img src={delete_icon} alt=""/>
            </div>
        </div>
    )
}
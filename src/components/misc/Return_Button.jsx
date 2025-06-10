import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/return_arrow.svg';

export default function Return_Button({returnAction=false}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='d-flex align-items-center gap-1 my-1'
            style={{
                cursor: 'pointer'
            }}
            onClick={returnAction || handleClick}
        >
            <img src={arrow} alt="" />
            <p style={{margin: '0px', fontSize: '20px', fontWeight: '600'}}>Voltar</p>
        </div>
    )

}
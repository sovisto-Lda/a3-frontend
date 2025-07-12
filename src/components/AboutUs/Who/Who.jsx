import general from '../general.module.css'

export default function Who() {
    return (
        <div className={`d-flex flex-column flex-sm-row align-items-center gap-5 my-5 py-3 ${general.wrapper}`}>
            
            <div className='w-100 d-flex flex-column gap-3'>
                <h3>Quem</h3>
                <p>
                    Os projetos são liderados por Luke Bailey, o cérebro por trás de todas as criações da A3 Projects. Reconhecido pelo seu bom humor, simpatia e generosidade, o Luke destaca-se por entregar sempre resultados de excelência com dedicação e paixão.
                </p>
            </div>

            <div className='w-100'>
                <img src={`${import.meta.env.VITE_API_URL}/images/theMan.png`} alt="" style={{width: "100%"}} />
            </div>

        </div>
    )
}
import BarItem from './Bar_Item';

export default function ProgressBar({stage, setStage}) {
    return (
        <div className='d-flex align-items-end'>
            <BarItem
                name="Informação do Cliente"
                number={1}
                stage={stage}
                setStage={setStage}
            />
            <BarItem
                name="Envio"
                number={2}
                stage={stage}
                setStage={setStage}
            />
            <BarItem
                name="Pagamento"
                number={3}
                stage={stage}
                setStage={setStage}
            />
            <BarItem
                name="Revisão do Pedido"
                number={4}
                stage={stage}
                setStage={setStage}
            />
        </div>
    ) 
}
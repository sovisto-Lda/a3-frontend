import BarItem from './Bar_Item';

export default function ProgressBar({stage}) {
    return (
        <div className='d-flex align-items-end'>
            <BarItem
                name="Informação do Cliente"
                number={1}
                stage={stage}
            />
            <BarItem
                name="Envio"
                number={2}
                stage={stage}
            />
            <BarItem
                name="Pagamento"
                number={3}
                stage={stage}
            />
            <BarItem
                name="Revisão do Pedido"
                number={4}
                stage={stage}
            />
        </div>
    ) 
}
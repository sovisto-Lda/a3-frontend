import DividerLine from "../../misc/Divider_Line";

export default function Review() {
    return (
        <div className="d-flex flex-column col-10">

            <div>
                <h2>Resumo</h2>
                <DividerLine />
            </div>

            {/* total items */}
            <div className="d-flex justify-content-between py-4">
                <p>3 Artigos</p>
                <p>17,97€</p>
            </div>

            {/* items list */}
            <div className="d-flex flex-column gap-2" style={{color: 'var(--cinzento)'}}>
                <div className="d-flex justify-content-between">
                    <p>Esquilo #30</p>
                    <p>5,99€</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Aranha #110</p>
                    <p>5,99€</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Tubarão #56</p>
                    <p>5,99€</p>
                </div>
            </div>

            {/* shipping */}
            <div className="d-flex justify-content-between py-2">
                <p>Envio</p>
                <p>2,99€</p>
            </div>            

            {/* total */}
            <div className="d-flex justify-content-between py-4">
                <p>Total, com taxas aplicadas</p>
                <p>20,96€</p>
            </div>            


            <DividerLine />



            <div className="d-flex flex-column w-100 gap-4 mt-4">
                <div className="w-100 d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                    {/* shipment type */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Tipo de Envio</h2>
                        <p>Domicílio</p>
                    </div>

                    {/* address */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Endereço de Envio</h2>
                        <p>bue de cenas loucas</p>
                    </div>
                </div>

                <div className="w-100 d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                    {/* payment */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Método de Pagamento</h2>
                        <p>Visa</p>
                    </div>

                    {/* arocess date */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Processado a</h2>
                        <p>25/02/25</p>
                    </div>
                </div>
            </div>

            <button
                className={`success-button w-100 mt-5`}
                type="button"
                style={{ height: '38px' }}
                // onClick={()=> navigate('/checkout')}
            >
                <p>Confirmar Compra</p>
            </button>

        </div>
    )
}
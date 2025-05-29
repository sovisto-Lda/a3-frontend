import DividerLine from "../Divider_Line";
import ProductsList from "./Products_List";
import Summary from "./Summary";


export default function ShoppingCartMain() {

    return (
        <div>
            <h1 className="my-3 my-sm-4">Carrinho de Compras</h1>
            {/* conteudo do carrinho */}
            <div className="d-flex gap-5 flex-column flex-md-row">

                {/* lado esquerdo: carrinho */}
               <ProductsList />

                {/* lado direito: sumário */}
                <Summary />


            </div>
                
        </div>
    )
}
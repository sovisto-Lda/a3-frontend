import DividerLine from "../Divider_Line";
import ProductCard from "./Product_Card";

export default function ProductsList() { 
    return (
        <div className="w-100">
            {/* linha cabeçalho */}
            <div className="d-flex w-100" style={{backgroundColor: 'red'}}>
                <h2 className="flex-grow-1" style={{backgroundColor: 'green'}}>Produto</h2>
                <h2 className="col-4 text-center" style={{backgroundColor: 'green'}}>Quantidade</h2>
                <h2 className="col-2 text-center" style={{backgroundColor: 'green'}}>Total</h2>
                <h2 className="col-2 text-end" style={{backgroundColor: 'green'}}>Ação</h2>

            </div>

            <DividerLine />

            <ProductCard />

            <DividerLine />
        </div>
    )
}
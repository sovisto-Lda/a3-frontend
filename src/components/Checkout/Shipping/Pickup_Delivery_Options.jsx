import AddressCard from "../../Cards/AddressCard"
import StoreCard from "../../Cards/Store_Card"
import SearchBar from "../../Header/SearchBar"

export default function PickupDeliveryOptions() {
    return (
        <div className="d-flex flex-column gap-4 mt-5">
            <h2>Escolha um Ponto de Recolha</h2>
            
            <div>
                {/* <SearchBar /> */}
                <div className="d-flex flex-column gap-3 mt-4">
                    {/* <StoreCard />
                    <StoreCard />
                    <StoreCard /> */}
                    <h3>Em breve...</h3>
                </div>

            </div>
        </div>
    )
}
import AddressCard from "../../Cards/AddressCard"

export default function HomeDeliveryOptions() {
    return (
        <div className="d-flex flex-column gap-4 mt-5">
            <h2>Endereços de Entrega</h2>
            <AddressCard />
        </div>
    )
}
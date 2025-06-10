import general from '../general.module.css'
import ClientReviewCard from './ClientCard'

export default function ClientReviews() {
    return (
        <div className={general.wrapper}>

            <h3>Os nossos clientes</h3>

            <div className='d-flex flex-column flex-md-row gap-2 gap-md-5 mt-3'>
                <ClientReviewCard />
                <ClientReviewCard />
                <ClientReviewCard />
            </div>

        </div>
    )
}
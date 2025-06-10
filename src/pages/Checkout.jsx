import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Return_Button from "../components/misc/Return_Button";
import ProgressBar from "../components/Checkout/Progress_Bar/Progress_Bar";
import InfoClient from "../components/Checkout/Info_Client/Info_Client";
import Shipping from "../components/Checkout/Shipping/Shipping";
import PaymentMethod from "../components/Checkout/Payment_Method/Payment_Method";
import Review from "../components/Checkout/Review/Review";

export default function Checkout() {
    const [stage, setStage] = useState(1);
    const navigate = useNavigate();
    
    return (
        <div>
            <Return_Button 
                returnAction={() => {
                    if (stage !== 1) {setStage(stage - 1)}
                    else {navigate(-1)}
                }}
            />

            <h1 className="my-3 my-sm-4">Checkout</h1>

            <ProgressBar stage={stage}/>

            <div className="w-100 d-flex justify-content-center mt-5">
                {stage === 1 && <InfoClient onNext={() => setStage(2)} />}

                {stage === 2 && <Shipping onNext={() => setStage(3)} />}

                {stage === 3 && <PaymentMethod onNext={() => setStage(4)} />}

                {stage === 4 && <Review onNext={() => console.log('DONE')} />}

            </div>

            
        </div>
    )

}
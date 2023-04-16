import { AddressElement, CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { Modal } from 'react-bootstrap';


const ShippingForm = () => {

    const paymentElementOptions = {
        layout: "tabs"
    }

    return(
        <Modal.Body>
            <form>
                <PaymentElement options={paymentElementOptions} />
                <AddressElement options={{ mode: "shipping" }} />
            </form>
        </Modal.Body>
    )
}

export default ShippingForm
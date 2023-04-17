import { Modal } from 'react-bootstrap';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { hideCheckout, selectCheckoutShown } from '../../reducers/cartSlice';
import CheckoutStepper from './CheckoutStepper';

import { useEffect } from 'react';
import { AddressElement, CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";




const CheckoutModal = () => {
    const elements = useElements()
    const stripe = useStripe()
    const checkoutShownState = useSelector(selectCheckoutShown)
    const dispatch = useDispatch()

    const handlePaymentSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/thankyou"
            }
        });

        if (result.error) {
            console.log(result.error.message)
        } 
    }

    const paymentElementOptions = {
        layout: "tabs"
    }

 




    return(
        <Modal show={checkoutShownState}  onHide={() => dispatch(hideCheckout())} size="xl" centered>
            <CheckoutStepper />
            
            <form onSubmit={handlePaymentSubmit}>
                <Modal.Body>
                    <PaymentElement options={paymentElementOptions} />
                    <AddressElement options={{ mode: "shipping" }} />
                </Modal.Body>
                <button type="submit" disabled={!stripe}>Submit</button>
            </form>
        </Modal>
    )
}

export default CheckoutModal;
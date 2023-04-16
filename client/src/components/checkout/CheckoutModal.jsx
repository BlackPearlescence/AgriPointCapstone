import { Modal } from 'react-bootstrap';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { hideCheckout, selectCheckoutShown } from '../../reducers/cartSlice';
import CheckoutStepper from './CheckoutStepper';
import ShippingForm from './ShippingForm';
import BillingForm from './BillingForm';
import ConfirmationForm from './ConfirmationForm';
import CompletionForm from './CompletionForm';



const CheckoutModal = () => {
    const elements = useElements()
    const stripe = useStripe()
    const checkoutShownState = useSelector(selectCheckoutShown)
    const dispatch = useDispatch()



    return(
        <Modal show={checkoutShownState}  onHide={() => dispatch(hideCheckout())} size="xl" centered>
            <CheckoutStepper />

            <ShippingForm />
            <BillingForm />
            <ConfirmationForm />
            <CompletionForm />
        </Modal>
    )
}

export default CheckoutModal;
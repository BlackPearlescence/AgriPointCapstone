import { Step, Icon } from 'semantic-ui-react';

const CheckoutStepper = () => {

    return (
            <Step.Group ordered>
                <Step>
                    <Icon name="shipping" />
                    <Step.Content>
                        <Step.Title>Shipping</Step.Title>
                        <Step.Description>Choose your shipping options</Step.Description>
                    </Step.Content>
                </Step>

                <Step>
                    <Icon name="payment" />
                    <Step.Content>
                        <Step.Title>Billing</Step.Title>
                        <Step.Description>Enter billing information</Step.Description>
                    </Step.Content>
                </Step>

                <Step>
                    <Icon name="info" />
                    <Step.Content>
                        <Step.Title>Confirm Order</Step.Title>
                    </Step.Content>
                </Step>

                <Step>
                    <Icon name="star" />
                    <Step.Content>
                        <Step.Title>Done!</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
    )
}

export default CheckoutStepper;
import React,{useState,useEffect} from 'react';
import {Typography,Button,Divider} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from '../../components/CheckoutForm/Review';
const stripePromise=loadStripe(process.env.React_App_Stripe_Pblic_Key)
const PaymentForm = ({checkoutToken,backStep,nextStep,shippingData,handleCaptureCheckout}) => {

    //here we make function to call when we submit our form
    const hadleSubmit=async (event,elements,stripe)=>{
        event.preventDefault();
        if(!stripe || !elements)return 
        const cardElement=elements.getElement(CardElement);
        const{error,paymentMethod}=await stripe.createPaymentMethod({type:'card',card:cardElement});
        if(error){
            console.log(error);
        }
        else{
            const orderData={
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                  gateway: 'stripe',
                  stripe: {
                    payment_method_id: paymentMethod.id,
                  },
                },
            }
            handleCaptureCheckout(checkoutToken.id,orderData);
            nextStep()
        }
    }
    console.log(checkoutToken)
    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin:"20px 0"}}>Payment Method</Typography>
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({elements,stripe})=>(
                    <form onSubmit={(e)=>hadleSubmit(e,elements,stripe)}>
                        <CardElement/>
                        <br/><br/>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <Button variant="outlined" onclick={backStep}>Back</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                pay{checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                    </form>
                )}
            </ElementsConsumer>

        </Elements>
        </>
    )
}

export default PaymentForm;

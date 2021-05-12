import React,{useState,useEffect} from 'react';
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from './../../CheckoutForm/AddressForm';
import PaymentForm from './../../CheckoutForm/PaymentForm';
import {commerce} from '../../../lib/Ecommerce'


const steps=["Shipping Address","Payment Details"];
const Checkout = ({cart,order,handleCaptureCheckout,error}) => {
    const [activeStep,setActiveStep]=useState(0);
    const [checkoutToken,setCheckoutToken]=useState(null);
    const [shippingData,setShippingData]=useState({});
    const classes=useStyles();
    useEffect(()=>{
        const generateToken=async()=>{
            try{
            
                   const token=await  commerce.checkout.generateToken(cart.id, { type: 'cart' })
                   console.log(token);
                   //now we need to pass CheckoutToekn as a props to the AddressForm
                   setCheckoutToken(token)
        }catch(error){
     
        }
     }
     generateToken()
    },[cart]);

    const nextStep=()=>setActiveStep((preActiveStep)=>preActiveStep+1)
    const backStep=()=>setActiveStep((preActiveStep)=>preActiveStep-1)    
    
    //we want shipping data according that we are shifting to the payment form
    const next=(data)=>{
        //this data we are get from AddressForm
                setShippingData(data);
                nextStep();
    }

    const Confirmation=()=>(
        <div>
            confirmation
        </div>
    )
    const Form=()=>
    //here we pass checkoutOutToken as a props to the AddressForm
        activeStep===0?<AddressForm next={next} checkoutToken={checkoutToken} />:<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep}   handleCaptureCheckout={handleCaptureCheckout}/>
    

   //here we write a function to generate an token,here we pass two parameter first is cart id and second is type of token
   


    return (
        <>
        <CssBaseline/>
          <div className={classes.toolbar}/>
          <main className={classes.layout}>
              <Paper className={classes.paper}>
                  <Typography variant="h4" align="center">Checkout</Typography>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step)=>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                  </Stepper>
                  {activeStep===steps.length?<Confirmation/>:checkoutToken &&<Form/>}
              </Paper>
          </main>

        </>
    )
}

export default Checkout;

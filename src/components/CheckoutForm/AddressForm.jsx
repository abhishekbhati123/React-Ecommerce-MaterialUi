import React,{useState,useEffect} from "react";
import { commerce } from '../../lib/Ecommerce';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import {Link} from "react-router-dom";                                
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
const AddressForm = ({checkoutToken}) => {
  //here we define initial state for shipping country,shipping subdivision,and shipping options
  const [shipingCountries,setShippingCountries]=useState([]);
  const [shipingCountry,setShippingCountry]=useState('');
  const [shipingSubdivisions,setShippingSubdivisions]=useState([]);
  const [shipingSubdivision,setShippingSubdivision]=useState('');
  const [shipingOptions,setShippingOptions]=useState([]);
  const [shipingOption,setShippingOption]=useState('');


  const method = useForm();
  //here we make array of objects
  const countries=   Object.entries(shipingCountries).map(([code,name])=>({id:code,label:name}))
console.log(countries)
  //write a function to fetch all available coutries
  const fetchShippingCountries=async(CheckoutTokenId)=>{
   const  {countries}=await commerce.services.localeListCountries(CheckoutTokenId)
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])
    console.log(setShippingCountry)

  }
  useEffect(()=>{
    fetchShippingCountries(checkoutToken.id);
},[]);
  return (
    <>
      <Typography variant="h6">sHIPPING address</Typography>
      <FormProvider {...method}>
        <form onSubmit="">
          <Grid conatiner spacing={3}>
            <CustomTextField required name="firstName" label="First name" />
            <CustomTextField required name="lastName" label="Last name" />
            <CustomTextField required name="address" label="Address" />
            <CustomTextField required name="email" label="Email" />
            <CustomTextField required name="city" label="City" />
            <CustomTextField required name="zip" label="ZIP/Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shipingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
              {countries.map((country)=>(
                 <MenuItem key={country.id} value={country.id}>
                 {country.label}
               </MenuItem>
              ))}
               
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value="" fullWidth onChange="">
                <MenuItem key="" value="">
                  Select Me
                </MenuItem>
              </Select>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value='' fullWidth onChange=''>
                <MenuItem key='' value=''>
                  Select Me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;

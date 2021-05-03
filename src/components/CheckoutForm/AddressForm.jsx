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
const AddressForm = ({checkoutToken,next}) => {
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
  //here we define our object in array of object using Object.entries
  const subdivisions=Object.entries(shipingSubdivisions).map(([code,name])=>({id:code,label:name}))
  const options=shipingOptions.map((sO)=>({id:sO.id,label:`${sO.description}-(${sO.price.formatted_with_symbol})`}))
console.log(countries)
  //write a function to fetch all available coutries
  const fetchShippingCountries=async(CheckoutTokenId)=>{
   const  {countries}=await commerce.services.localeListCountries(CheckoutTokenId)
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])
    console.log(setShippingCountry)
}
const fetchSubdivisions=async(countryCode)=>{
  const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode)
  console.log(subdivisions)
  setShippingSubdivisions(subdivisions);
  setShippingSubdivision(Object.keys(subdivisions)[0])
  console.log(setShippingSubdivision)
}
const fetchShippingOptions=async(checkoutTokenId,country,region=null)=>{
 const options= await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
 setShippingOptions(options);
 setShippingOption(options[0].id)
  console.log(options)
}

  useEffect(()=>{
    fetchShippingCountries(checkoutToken.id);
},[]);
useEffect(()=>{
  if(shipingCountry)fetchSubdivisions(shipingCountry);
},[shipingCountry])

useEffect(()=>{
 if(shipingSubdivision) fetchShippingOptions(checkoutToken.id,shipingCountry,shipingSubdivision)
},[shipingSubdivision])
  return (
    <>
      <Typography variant="h6">sHIPPING address</Typography>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit((data)=>next({...data,shipingCountry,shipingSubdivision,shipingOption}))}>
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
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shipingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision)=>(
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                            {subdivision.label}
                          </MenuItem>
                ))}
          
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shipingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                {options.map((option)=>(
                  <MenuItem key={options.id} value={option.id}>
                  {option.label}
                </MenuItem>
  ))
                      
                }
                
              </Select>
            </Grid>
          </Grid>
          <br/>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
      </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;

import React,{useState,useEffect} from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import {commerce} from './lib/Ecommerce';

const App = () => {
    //Now we are going to fetch/load data from commerce api so to store that data we need state
    const [products,setProduct]=useState([]); 
    //here we make a function to fetch the data from ecommerce
   //here we gonna use await and async to write cleaner code
   //and we also destrure the data from thr commerce instance

    const fetchProduct= async () =>{
        const {data}=await commerce.products.list();
        console.log(data);
        setProduct(data);
    }
    useEffect(()=>{
        fetchProduct();
    },[]);
    return (
        <div>
      <Navbar/>      
     <Products products={products}/>
        </div>
    )
}

export default App
    